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
  res.redirect('/test-slide14');
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Visual engine activo'
  });
});

/****************************************************
 * SLIDE 10
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
 * SLIDE 12
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
 * SLIDE 14
 ****************************************************/

app.get('/test-slide14', async (req, res) => {
  try {
    const sample = getSampleSlide14();
    res.render('slide14', sample);
  } catch (error) {
    console.error('Error en /test-slide14:', error);
    res.status(500).send('Error en /test-slide14: ' + error);
  }
});

app.get('/test-slide14-png', async (req, res) => {
  try {
    const sample = getSampleSlide14();
    const html = await renderEjsToString('slide14', sample);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error generando PNG slide 14:', error);
    res.status(500).send('Error generando PNG slide 14: ' + error);
  }
});

app.post('/render/slide14', async (req, res) => {
  try {
    const data = normalizeSlide14Data(req.body || {});
    const html = await renderEjsToString('slide14', data);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error renderizando slide14:', error);
    res.status(500).json({
      ok: false,
      error: String(error)
    });
  }
});

/****************************************************
 * DATOS DE PRUEBA - SLIDE 10
 ****************************************************/

function getSampleSlide10() {
  return normalizeSlide10Data({
    titulo: 'ATENCIONES EN LA OPERACIÓN YAURICOCHA - ABRIL 2026',
    periodo: 'Abril 2026',
    logoText: 'COMM',

    diasPeriodo: 30,
    totalAtenciones: 137,
    totalHoras: 391,
    promedioAtencionesDia: '4.6',
    promedioHorasDia: '13.0',
    horasPorAtencion: '2.85',
    diasConAtencion: 30,

    dias: [
      { fecha: '01/04/2026', dia: '01', atenciones: 4, horas: 12 },
      { fecha: '02/04/2026', dia: '02', atenciones: 6, horas: 18 },
      { fecha: '03/04/2026', dia: '03', atenciones: 5, horas: 16 },
      { fecha: '04/04/2026', dia: '04', atenciones: 7, horas: 19 },
      { fecha: '05/04/2026', dia: '05', atenciones: 4, horas: 13 },
      { fecha: '06/04/2026', dia: '06', atenciones: 5, horas: 14 },
      { fecha: '07/04/2026', dia: '07', atenciones: 6, horas: 21 },
      { fecha: '08/04/2026', dia: '08', atenciones: 3, horas: 11 },
      { fecha: '09/04/2026', dia: '09', atenciones: 5, horas: 13 },
      { fecha: '10/04/2026', dia: '10', atenciones: 4, horas: 12 },
      { fecha: '11/04/2026', dia: '11', atenciones: 7, horas: 20 },
      { fecha: '12/04/2026', dia: '12', atenciones: 4, horas: 12 },
      { fecha: '13/04/2026', dia: '13', atenciones: 6, horas: 15 },
      { fecha: '14/04/2026', dia: '14', atenciones: 3, horas: 10 },
      { fecha: '15/04/2026', dia: '15', atenciones: 4, horas: 12 },
      { fecha: '16/04/2026', dia: '16', atenciones: 5, horas: 14 },
      { fecha: '17/04/2026', dia: '17', atenciones: 4, horas: 13 },
      { fecha: '18/04/2026', dia: '18', atenciones: 6, horas: 17 },
      { fecha: '19/04/2026', dia: '19', atenciones: 3, horas: 11 },
      { fecha: '20/04/2026', dia: '20', atenciones: 4, horas: 12 },
      { fecha: '21/04/2026', dia: '21', atenciones: 5, horas: 15 },
      { fecha: '22/04/2026', dia: '22', atenciones: 3, horas: 10 },
      { fecha: '23/04/2026', dia: '23', atenciones: 4, horas: 12 },
      { fecha: '24/04/2026', dia: '24', atenciones: 5, horas: 13 },
      { fecha: '25/04/2026', dia: '25', atenciones: 3, horas: 9 },
      { fecha: '26/04/2026', dia: '26', atenciones: 4, horas: 12 },
      { fecha: '27/04/2026', dia: '27', atenciones: 5, horas: 15 },
      { fecha: '28/04/2026', dia: '28', atenciones: 3, horas: 10 },
      { fecha: '29/04/2026', dia: '29', atenciones: 4, horas: 12 },
      { fecha: '30/04/2026', dia: '30', atenciones: 5, horas: 13 }
    ],

    insights: [
      'Volumen total significativo de actividad operativa.',
      'Estabilidad operativa con picos controlados de demanda.',
      'Monitoreo continuo para mantener la calidad del servicio.'
    ],

    insight:
      'La distribución diaria evidencia estabilidad operativa y picos controlados de demanda durante el periodo evaluado.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 12
 ****************************************************/

function getSampleSlide12() {
  return normalizeSlide12Data({
    titulo: 'Yauricocha - Abril 2026 - Incidentes vs Requerimientos',
    periodo: 'Abril 2026',
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
 * DATOS DE PRUEBA - SLIDE 14
 ****************************************************/

function getSampleSlide14() {
  return normalizeSlide14Data({
    titulo: 'Yauricocha - Abril 2026 - Top 10 Requerimientos',
    periodo: 'Abril 2026',
    logoText: 'COMM',

    totalRequerimientos: 96,
    totalTiempoHoras: 195,

    items: [
      {
        nombre: 'Mantenimiento Programado (DAT)',
        cantidad: 49,
        tiempoHoras: 99
      },
      {
        nombre: 'Instalación Nueva (CCTV)',
        cantidad: 15,
        tiempoHoras: 34
      },
      {
        nombre: 'Mantenimiento Programado (CCTV)',
        cantidad: 11,
        tiempoHoras: 15
      },
      {
        nombre: 'Instalación Nueva (DAT)',
        cantidad: 6,
        tiempoHoras: 13
      },
      {
        nombre: 'Instalación Nueva (RAD)',
        cantidad: 6,
        tiempoHoras: 15
      },
      {
        nombre: 'Mantenimiento Programado (RAD)',
        cantidad: 2,
        tiempoHoras: 5
      },
      {
        nombre: 'Mantenimiento Programado (FO)',
        cantidad: 2,
        tiempoHoras: 4
      },
      {
        nombre: 'Instalación Nueva (TEL)',
        cantidad: 2,
        tiempoHoras: 3
      },
      {
        nombre: 'Instalación Nueva (GEO)',
        cantidad: 2,
        tiempoHoras: 5
      },
      {
        nombre: 'Instalación Nueva (FO)',
        cantidad: 1,
        tiempoHoras: 2
      }
    ],

    insights: [
      'Mantenimiento Programado DAT representa la principal causa de requerimientos del periodo.',
      'El Top 3 concentra más del 78% del total registrado.',
      'La priorización de las causas principales permite enfocar recursos operativos.'
    ],

    insight:
      'La mayor incidencia se concentra en Mantenimiento Programado (DAT).'
  });
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 10
 ****************************************************/

function normalizeSlide10Data(body) {
  const dias = Array.isArray(body.dias) ? body.dias : [];

  const cleanedDias = dias
    .filter(d => d && (d.fecha !== undefined || d.dia !== undefined))
    .map(d => ({
      fecha: String(d.fecha || d.dia || '').trim(),
      dia: String(d.dia || d.fecha || '').trim(),
      atenciones: toNumber(d.atenciones),
      horas: toNumber(d.horas)
    }));

  const totalAtenciones =
    toNumber(body.totalAtenciones) ||
    cleanedDias.reduce((acc, d) => acc + d.atenciones, 0);

  const totalHoras =
    toNumber(body.totalHoras) ||
    cleanedDias.reduce((acc, d) => acc + d.horas, 0);

  const diasConAtencion =
    toNumber(body.diasConAtencion || body.diasPeriodo) ||
    cleanedDias.filter(d => d.atenciones > 0 || d.horas > 0).length;

  const promedioAtencionesDia =
    body.promedioAtencionesDia ||
    (diasConAtencion ? (totalAtenciones / diasConAtencion).toFixed(1) : '0.0');

  const promedioHorasDia =
    body.promedioHorasDia ||
    (diasConAtencion ? (totalHoras / diasConAtencion).toFixed(1) : '0.0');

  const horasPorAtencion =
    body.horasPorAtencion ||
    (totalAtenciones ? (totalHoras / totalAtenciones).toFixed(2) : '0.00');

  const insights = Array.isArray(body.insights)
    ? body.insights
    : [
        body.insight || 'Volumen total significativo de actividad operativa.',
        'Estabilidad operativa con picos controlados de demanda.',
        'Monitoreo continuo para mantener la calidad del servicio.'
      ];

  return {
    titulo:
      body.titulo ||
      `ATENCIONES EN LA OPERACIÓN YAURICOCHA - ${body.periodo || 'PERIODO'}`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    diasPeriodo: toNumber(body.diasPeriodo) || diasConAtencion,
    totalAtenciones,
    totalHoras,
    promedioAtencionesDia,
    promedioHorasDia,
    horasPorAtencion,
    diasConAtencion,

    dias: cleanedDias,

    insight:
      body.insight ||
      'La distribución diaria evidencia estabilidad operativa y picos controlados de demanda durante el periodo evaluado.',

    insights
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 12
 ****************************************************/

function normalizeSlide12Data(body) {
  const kpis = body.kpis || {};

  const totalAtenciones = toNumber(
    body.totalAtenciones ??
    kpis.totalAtenciones ??
    0
  );

  const incidentes = toNumber(
    body.incidentes ??
    kpis.incidentes ??
    0
  );

  const requerimientos = toNumber(
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

  const brecha = toNumber(
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

    periodo: body.periodo || 'Periodo',
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
 * NORMALIZAR DATOS - SLIDE 14
 ****************************************************/

function normalizeSlide14Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topRequerimientos)
      ? body.topRequerimientos
      : [];

  let items = rawItems
    .filter(item => item && (item.nombre || item.descripcion || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        return {
          nombre: String(item[0] || '').trim(),
          cantidad: toNumber(item[1]),
          tiempoHoras: toNumber(item[2])
        };
      }

      return {
        nombre: String(item.nombre || item.descripcion || item.requerimiento || '').trim(),
        cantidad: toNumber(item.cantidad ?? item.total ?? item.valor ?? 0),
        tiempoHoras: toNumber(item.tiempoHoras ?? item.tiempo ?? item.horas ?? item.totalHoras ?? 0)
      };
    })
    .filter(item => item.nombre && item.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10);

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalTiempoHoras =
    toNumber(body.totalTiempoHoras ?? body.tiempoTotalHoras ?? body.totalHoras ?? 0) ||
    items.reduce((acc, item) => acc + item.tiempoHoras, 0);

  const totalRequerimientos =
    toNumber(body.totalRequerimientos ?? body.total ?? body.requerimientos ?? 0) ||
    totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalRequerimientos)
  }));

  const top1 = items[0] || {
    nombre: '-',
    cantidad: 0,
    tiempoHoras: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items
    .slice(0, 2)
    .reduce((acc, item) => acc + item.cantidad, 0);

  const top3Cantidad = items
    .slice(0, 3)
    .reduce((acc, item) => acc + item.cantidad, 0);

  const pctTop2 = body.pctTop2 || calcPct(top2Cantidad, totalRequerimientos);
  const pctTop3 = body.pctTop3 || calcPct(top3Cantidad, totalRequerimientos);
  const pctTop10 = body.pctTop10 || calcPct(totalTop10, totalRequerimientos);

  const principalRequerimiento =
    body.principalRequerimiento ||
    top1.nombre;

  const cantidadPrincipal =
    body.cantidadPrincipal ||
    top1.cantidad;

  const pctPrincipal =
    body.pctPrincipal ||
    top1.porcentaje;

  const insights = Array.isArray(body.insights)
    ? body.insights
    : [
        body.insight || 'Los principales requerimientos concentran oportunidades de mejora para priorizar recursos operativos.',
        'La gestión del Top 10 permite enfocar acciones sobre las demandas más recurrentes.',
        'El seguimiento mensual facilita controlar recurrencias y fortalecer la planificación del servicio.'
      ];

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Top 10 Requerimientos`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalRequerimientos,
    totalTop10,
    totalTiempoHoras,

    principalRequerimiento,
    cantidadPrincipal,
    pctPrincipal,
    pctTop2,
    pctTop3,
    pctTop10,

    items,

    insight:
      body.insight ||
      `La mayor incidencia se concentra en ${principalRequerimiento}.`,

    insights
  };
}

/****************************************************
 * HELPERS GENERALES
 ****************************************************/

function toNumber(value) {
  if (typeof value === 'number') return value;

  const txt = String(value || '')
    .replace(',', '.')
    .replace(/[^\d.-]/g, '');

  return Number(txt) || 0;
}

function calcPct(value, total) {
  if (!total) return '0.00%';
  return ((Number(value) / Number(total)) * 100).toFixed(2) + '%';
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
