const express = require('express');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/****************************************************
 * RUTAS DE PRUEBA
 ****************************************************/

app.get('/', (req, res) => {
  res.redirect('/test-slide12');
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Visual engine activo'
  });
});

app.get('/test-slide12', async (req, res) => {
  try {
    const sample = getSampleSlide12();
    res.render('slide12', sample);
  } catch (error) {
    console.error('Error en /test-slide12:', error);
    res.status(500).send('Error en /test-slide12: ' + error);
  }
});

app.get('/test-slide12-png', async (req, res) => {
  try {
    const sample = getSampleSlide12();
    const html = await renderEjsToString('slide12', sample);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);

  } catch (error) {
    console.error('Error generando PNG:', error);
    res.status(500).send('Error generando PNG: ' + error);
  }
});

/****************************************************
 * RUTA REAL PARA APPS SCRIPT
 ****************************************************/

app.post('/render/slide12', async (req, res) => {
  try {
    const data = normalizeSlide12Data(req.body || {});
    const html = await renderEjsToString('slide12', data);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);

  } catch (error) {
    console.error('Error renderizando slide12:', error);
    res.status(500).json({
      ok: false,
      error: String(error)
    });
  }
});

/****************************************************
 * DATOS DE PRUEBA
 ****************************************************/

function getSampleSlide12() {
  return normalizeSlide12Data({
    titulo: 'Yauricocha - Abril 2026 - Incidentes vs Requerimientos',
    logoText: 'COMM',

    totalAtenciones: 137,
    incidentes: 39,
    requerimientos: 98,
    brecha: 59,

    pctIncidentes: '28.47%',
    pctRequerimientos: '71.53%',

    tabla: {
      up: 'TOTAL',
      incidentes: 39,
      requerimientos: 98,
      total: 137,
      pctIncidentes: '28.47%',
      pctRequerimientos: '71.53%',
      pctTotal: '100%'
    },

    insight:
      'La mayoría de las atenciones corresponden a requerimientos, evidenciando prioridad de gestión en actividades planificadas frente a incidencias.'
  });
}

/****************************************************
 * NORMALIZAR DATOS
 ****************************************************/

function normalizeSlide12Data(body) {
  const kpis = body.kpis || {};

  const totalAtenciones = Number(
    body.totalAtenciones ??
    kpis.totalAtenciones ??
    0
  );

  const incidentes = Number(
    body.incidentes ??
    kpis.incidentes ??
    0
  );

  const requerimientos = Number(
    body.requerimientos ??
    kpis.requerimientos ??
    0
  );

  const total = totalAtenciones || incidentes + requerimientos;

  const pctIncidentes =
    body.pctIncidentes ??
    kpis.pctIncidentes ??
    calcPct(incidentes, total);

  const pctRequerimientos =
    body.pctRequerimientos ??
    kpis.pctRequerimientos ??
    calcPct(requerimientos, total);

  const brecha = Number(
    body.brecha ??
    kpis.brecha ??
    requerimientos - incidentes
  );

  const tabla = normalizeTabla(body.tabla, {
    incidentes,
    requerimientos,
    total,
    pctIncidentes,
    pctRequerimientos
  });

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Incidentes vs Requerimientos`,

    logoText: body.logoText || 'COMM',

    totalAtenciones: total,
    incidentes,
    requerimientos,
    brecha,

    pctIncidentes,
    pctRequerimientos,

    donutIncidentes: incidentes,
    donutRequerimientos: requerimientos,

    tabla,

    insight:
      body.insight ||
      'La mayoría de las atenciones corresponden a requerimientos, evidenciando prioridad de gestión en actividades planificadas frente a incidencias.'
  };
}

function normalizeTabla(tabla, base) {
  if (tabla && !Array.isArray(tabla)) {
    return {
      up: tabla.up || 'TOTAL',
      incidentes: tabla.incidentes ?? base.incidentes,
      requerimientos: tabla.requerimientos ?? base.requerimientos,
      total: tabla.total ?? base.total,
      pctIncidentes: tabla.pctIncidentes ?? base.pctIncidentes,
      pctRequerimientos: tabla.pctRequerimientos ?? base.pctRequerimientos,
      pctTotal: tabla.pctTotal || '100%'
    };
  }

  if (Array.isArray(tabla) && tabla.length >= 3) {
    return {
      up: tabla[1][0] || 'TOTAL',
      incidentes: tabla[1][1],
      requerimientos: tabla[1][2],
      total: tabla[1][3],
      pctIncidentes: tabla[2][1],
      pctRequerimientos: tabla[2][2],
      pctTotal: tabla[2][3] || '100%'
    };
  }

  return {
    up: 'TOTAL',
    incidentes: base.incidentes,
    requerimientos: base.requerimientos,
    total: base.total,
    pctIncidentes: base.pctIncidentes,
    pctRequerimientos: base.pctRequerimientos,
    pctTotal: '100%'
  };
}

function calcPct(value, total) {
  if (!total) return '0.00%';
  return ((value / total) * 100).toFixed(2) + '%';
}

/****************************************************
 * RENDER EJS
 ****************************************************/

function renderEjsToString(viewName, data) {
  return new Promise((resolve, reject) => {
    app.render(viewName, data, (err, html) => {
      if (err) return reject(err);
      resolve(html);
    });
  });
}

/****************************************************
 * CONVERTIR HTML A PNG
 * Funciona en laptop y en Render
 ****************************************************/

async function htmlToPng(html) {
  let browser;

  try {
    const launchOptions = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    };

    // Si está en tu laptop, usa Chrome o Edge instalado.
    // Si está en Render, no encontrará estas rutas y usará el Chrome de Puppeteer.
    const localChromePath = getLocalChromePath();

    if (localChromePath) {
      launchOptions.executablePath = localChromePath;
    }

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();

    await page.setViewport({
      width: 1600,
      height: 900,
      deviceScaleFactor: 2
    });

    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    await page.addStyleTag({
      path: path.join(__dirname, 'public', 'styles.css')
    });

    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });

    return Buffer.from(screenshot);

  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/****************************************************
 * BUSCAR CHROME / EDGE LOCAL
 ****************************************************/

function getLocalChromePath() {
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  return possiblePaths.find(p => fs.existsSync(p)) || null;
}

/****************************************************
 * INICIAR SERVIDOR
 ****************************************************/

app.listen(PORT, () => {
  console.log(`Visual engine corriendo en http://localhost:${PORT}`);
});