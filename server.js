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
 * RUTAS GENERALES
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

/****************************************************
 * SLIDE 12 - PRUEBAS
 ****************************************************/

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
    console.error('Error generando PNG slide 12:', error);
    res.status(500).send('Error generando PNG slide 12: ' + error);
  }
});

/****************************************************
 * SLIDE 12 - RUTA REAL APPS SCRIPT
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
 * SLIDE 10 - PRUEBAS
 ****************************************************/

app.get('/test-slide10', async (req, res) => {
  try {
    const sample = getSampleSlide10();
    res.render('slide10', sample);
  } catch (error) {
    console.error('Error en /test-slide10:', error);
    res.status(500).send('Error en /test-slide10: ' + error);
  }
});

app.get('/test-slide10-png', async (req, res) => {
  try {
    const sample = getSampleSlide10();
    const html = await renderEjsToString('slide10', sample);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error generando PNG slide 10:', error);
    res.status(500).send('Error generando PNG slide 10: ' + error);
  }
});

/****************************************************
 * SLIDE 10 - RUTA REAL APPS SCRIPT
 ****************************************************/

app.post('/render/slide10', async (req, res) => {
  try {
    const data = normalizeSlide10Data(req.body || {});
    const html = await renderEjsToString('slide10', data);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error renderizando slide10:', error);
    res.status(500).json({
      ok: false,
      error: String(error)
    });
  }
});

/****************************************************
 * DATOS DE PRUEBA - SLIDE 12
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
 * DATOS DE PRUEBA - SLIDE 10
 ****************************************************/

function getSampleSlide10() {
  return normalizeSlide10Data({
    titulo: 'Yauricocha - Abril 2026 - Atenciones y Horas por Día',
    logoText: 'COMM',

    totalAtenciones: 137,
    totalHoras: 482,
    promedioAtencionesDia: '4.6',
    promedioHorasDia: '16.1',
    diaMayorAtencion: '11',
    diasConAtencion: 30,

    dias: [
      { dia: '01', atenciones: 4, horas: 18 },
      { dia: '02', atenciones: 6, horas: 22 },
      { dia: '03', atenciones: 5, horas: 20 },
      { dia: '04', atenciones: 9, horas: 31 },
      { dia: '05', atenciones: 7, horas: 26 },
      { dia: '06', atenciones: 3, horas: 14 },
      { dia: '07', atenciones: 8, horas: 29 },
      { dia: '08', atenciones: 10, horas: 36 },
      { dia: '09', atenciones: 6, horas: 24 },
      { dia: '10', atenciones: 5, horas: 19 },
      { dia: '11', atenciones: 11, horas: 39 },
      { dia: '12', atenciones: 7, horas: 27 },
      { dia: '13', atenciones: 4, horas: 16 },
      { dia: '14', atenciones: 9, horas: 34 },
      { dia: '15', atenciones: 3, horas: 12 },
      { dia: '16', atenciones: 6, horas: 21 },
      { dia: '17', atenciones: 5, horas: 18 },
      { dia: '18', atenciones: 8, horas: 30 },
      { dia: '19', atenciones: 6, horas: 23 },
      { dia: '20', atenciones: 4, horas: 17 },
      { dia: '21', atenciones: 7, horas: 25 },
      { dia: '22', atenciones: 5, horas: 19 },
      { dia: '23', atenciones: 6, horas: 22 },
      { dia: '24', atenciones: 4, horas: 15 },
      { dia: '25', atenciones: 7, horas: 26 },
      { dia: '26', atenciones: 5, horas: 20 },
      { dia: '27', atenciones: 3, horas: 13 },
      { dia: '28', atenciones: 6, horas: 21 },
      { dia: '29', atenciones: 4, horas: 17 },
      { dia: '30', atenciones: 5, horas: 18 }
    ],

    insight:
      'La distribución diaria evidencia concentración operativa en jornadas específicas, permitiendo priorizar recursos y reforzar la planificación de atenciones.'
  });
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 12
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

  const tabla = normalizeTablaSlide12(body.tabla, {
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

function normalizeTablaSlide12(tabla, base) {
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

/****************************************************
 * NORMALIZAR DATOS - SLIDE 10
 ****************************************************/

function normalizeSlide10Data(body) {
  const dias = Array.isArray(body.dias) ? body.dias : [];

  const cleanedDias = dias
    .filter(d => d && d.dia !== undefined)
    .map(d => ({
      dia: String(d.dia).padStart(2, '0'),
      atenciones: Number(d.atenciones) || 0,
      horas: Number(d.horas) || 0
    }));

  const totalAtenciones =
    Number(body.totalAtenciones) ||
    cleanedDias.reduce((acc, d) => acc + d.atenciones, 0);

  const totalHoras =
    Number(body.totalHoras) ||
    cleanedDias.reduce((acc, d) => acc + d.horas, 0);

  const diasConAtencion =
    Number(body.diasConAtencion) ||
    cleanedDias.filter(d => d.atenciones > 0).length;

  const promedioAtencionesDia =
    body.promedioAtencionesDia ||
    (diasConAtencion ? (totalAtenciones / diasConAtencion).toFixed(1) : '0.0');

  const promedioHorasDia =
    body.promedioHorasDia ||
    (diasConAtencion ? (totalHoras / diasConAtencion).toFixed(1) : '0.0');

  const topDia = cleanedDias.length
    ? cleanedDias.reduce((max, d) => d.atenciones > max.atenciones ? d : max, cleanedDias[0])
    : { dia: '-', atenciones: 0 };

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Atenciones y Horas por Día`,

    logoText: body.logoText || 'COMM',

    totalAtenciones,
    totalHoras,
    promedioAtencionesDia,
    promedioHorasDia,
    diaMayorAtencion: body.diaMayorAtencion || topDia.dia,
    diasConAtencion,

    dias: cleanedDias,

    insight:
      body.insight ||
      'La distribución diaria evidencia concentración operativa en jornadas específicas, permitiendo priorizar recursos y reforzar la planificación de atenciones.'
  };
}

/****************************************************
 * HELPERS GENERALES
 ****************************************************/

function calcPct(value, total) {
  if (!total) return '0.00%';
  return ((value / total) * 100).toFixed(2) + '%';
}

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
