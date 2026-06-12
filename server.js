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
  res.redirect('/test-slide11');
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
 * SLIDE 11
 ****************************************************/

app.get('/test-slide11', async (req, res) => {
  try {
    const sample = getSampleSlide11();
    res.render('slide11', sample);
  } catch (error) {
    console.error('Error en /test-slide11:', error);
    res.status(500).send('Error en /test-slide11: ' + error);
  }
});

app.get('/test-slide11-png', async (req, res) => {
  try {
    const sample = getSampleSlide11();
    const html = await renderEjsToString('slide11', sample);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error generando PNG slide 11:', error);
    res.status(500).send('Error generando PNG slide 11: ' + error);
  }
});

app.post('/render/slide11', async (req, res) => {
  try {
    const data = normalizeSlide11Data(req.body || {});
    const html = await renderEjsToString('slide11', data);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error renderizando slide11:', error);
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
 * SLIDE 15
 ****************************************************/

app.get('/test-slide15', async (req, res) => {
  try {
    const sample = getSampleSlide15();
    res.render('slide15', sample);
  } catch (error) {
    console.error('Error en /test-slide15:', error);
    res.status(500).send('Error en /test-slide15: ' + error);
  }
});

app.get('/test-slide15-png', async (req, res) => {
  try {
    const sample = getSampleSlide15();
    const html = await renderEjsToString('slide15', sample);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error generando PNG slide 15:', error);
    res.status(500).send('Error generando PNG slide 15: ' + error);
  }
});

app.post('/render/slide15', async (req, res) => {
  try {
    const data = normalizeSlide15Data(req.body || {});
    const html = await renderEjsToString('slide15', data);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error renderizando slide15:', error);
    res.status(500).json({
      ok: false,
      error: String(error)
    });
  }
});

/****************************************************
 * SLIDE 17
 ****************************************************/

app.get('/test-slide17', async (req, res) => {
  try {
    const sample = getSampleSlide17();
    res.render('slide17', sample);
  } catch (error) {
    console.error('Error en /test-slide17:', error);
    res.status(500).send('Error en /test-slide17: ' + error);
  }
});

app.get('/test-slide17-png', async (req, res) => {
  try {
    const sample = getSampleSlide17();
    const html = await renderEjsToString('slide17', sample);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error generando PNG slide 17:', error);
    res.status(500).send('Error generando PNG slide 17: ' + error);
  }
});

app.post('/render/slide17', async (req, res) => {
  try {
    const data = normalizeSlide17Data(req.body || {});
    const html = await renderEjsToString('slide17', data);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error renderizando slide17:', error);
    res.status(500).json({
      ok: false,
      error: String(error)
    });
  }
});

/****************************************************
 * SLIDE 18
 ****************************************************/

app.get('/test-slide18', async (req, res) => {
  try {
    const sample = getSampleSlide18();
    res.render('slide18', sample);
  } catch (error) {
    console.error('Error en /test-slide18:', error);
    res.status(500).send('Error en /test-slide18: ' + error);
  }
});

app.get('/test-slide18-png', async (req, res) => {
  try {
    const sample = getSampleSlide18();
    const html = await renderEjsToString('slide18', sample);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error generando PNG slide 18:', error);
    res.status(500).send('Error generando PNG slide 18: ' + error);
  }
});

app.post('/render/slide18', async (req, res) => {
  try {
    const data = normalizeSlide18Data(req.body || {});
    const html = await renderEjsToString('slide18', data);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error renderizando slide18:', error);
    res.status(500).json({
      ok: false,
      error: String(error)
    });
  }
});

/****************************************************
 * SLIDE 19
 ****************************************************/

app.get('/test-slide19', async (req, res) => {
  try {
    const sample = getSampleSlide19();
    res.render('slide19', sample);
  } catch (error) {
    console.error('Error en /test-slide19:', error);
    res.status(500).send('Error en /test-slide19: ' + error);
  }
});

app.get('/test-slide19-png', async (req, res) => {
  try {
    const sample = getSampleSlide19();
    const html = await renderEjsToString('slide19', sample);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error generando PNG slide 19:', error);
    res.status(500).send('Error generando PNG slide 19: ' + error);
  }
});

app.post('/render/slide19', async (req, res) => {
  try {
    const data = normalizeSlide19Data(req.body || {});
    const html = await renderEjsToString('slide19', data);
    const imageBuffer = await htmlToPng(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', imageBuffer.length);
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error renderizando slide19:', error);
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

    insight:
      'La distribución diaria evidencia estabilidad operativa y picos controlados de demanda durante el periodo evaluado.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 11
 ****************************************************/

function getSampleSlide11() {
  return normalizeSlide11Data({
    titulo: 'Yauricocha - Abril 2026 - Mina vs Superficie',
    periodo: 'Abril 2026',
    logoText: 'COMM',

    totalAtenciones: 137,
    totalHoras: 391,

    items: [
      { zona: 'Mina', atenciones: 72, horas: 215 },
      { zona: 'Superficie', atenciones: 65, horas: 176 }
    ],

    insight:
      'La mayor concentración de atenciones se presenta en Mina.'
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
      { nombre: 'Mantenimiento Programado (DAT)', cantidad: 49, tiempoHoras: 99 },
      { nombre: 'Instalación Nueva (CCTV)', cantidad: 15, tiempoHoras: 34 },
      { nombre: 'Mantenimiento Programado (CCTV)', cantidad: 11, tiempoHoras: 15 },
      { nombre: 'Instalación Nueva (DAT)', cantidad: 6, tiempoHoras: 13 },
      { nombre: 'Instalación Nueva (RAD)', cantidad: 6, tiempoHoras: 15 },
      { nombre: 'Mantenimiento Programado (RAD)', cantidad: 2, tiempoHoras: 5 },
      { nombre: 'Mantenimiento Programado (FO)', cantidad: 2, tiempoHoras: 4 },
      { nombre: 'Instalación Nueva (TEL)', cantidad: 2, tiempoHoras: 3 },
      { nombre: 'Instalación Nueva (GEO)', cantidad: 2, tiempoHoras: 5 },
      { nombre: 'Instalación Nueva (FO)', cantidad: 1, tiempoHoras: 2 }
    ],

    insight:
      'La mayor incidencia se concentra en Mantenimiento Programado (DAT).'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 15
 ****************************************************/

function getSampleSlide15() {
  return normalizeSlide15Data({
    titulo: 'Yauricocha - Abril 2026 - Top 10 Incidentes',
    periodo: 'Abril 2026',
    logoText: 'COMM',

    totalIncidentes: 39,
    totalTiempoHoras: 116,

    items: [
      { nombre: 'Sin señal de comunicación', cantidad: 11, tiempoHoras: 32 },
      { nombre: 'Equipo de radio averiado', cantidad: 8, tiempoHoras: 24 },
      { nombre: 'Corte de cable UTP', cantidad: 6, tiempoHoras: 17 },
      { nombre: 'Intermitencia de red', cantidad: 4, tiempoHoras: 12 },
      { nombre: 'Falla en cámara CCTV', cantidad: 3, tiempoHoras: 9 },
      { nombre: 'Punto de red sin enlace', cantidad: 2, tiempoHoras: 6 },
      { nombre: 'Falla en fuente de poder', cantidad: 2, tiempoHoras: 5 },
      { nombre: 'Conector RJ45 dañado', cantidad: 1, tiempoHoras: 4 },
      { nombre: 'Baja intensidad de señal', cantidad: 1, tiempoHoras: 4 },
      { nombre: 'Reinicio de equipo de comunicación', cantidad: 1, tiempoHoras: 3 }
    ],

    insight:
      'La mayor incidencia se concentra en Sin señal de comunicación.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 17
 ****************************************************/

function getSampleSlide17() {
  return normalizeSlide17Data({
    titulo: 'Yauricocha - Abril 2026 - Top Suministros General',
    periodo: 'Abril 2026',
    logoText: 'COMM',

    totalSuministros: 318,

    items: [
      { nombre: 'Cable UTP', unidad: 'mts', requerimientos: 80, incidentes: 30, cantidad: 110 },
      { nombre: 'Conector RJ45', unidad: 'UN', requerimientos: 45, incidentes: 22, cantidad: 67 },
      { nombre: 'Cintillos', unidad: 'UN', requerimientos: 38, incidentes: 16, cantidad: 54 },
      { nombre: 'Canaleta', unidad: 'mts', requerimientos: 24, incidentes: 10, cantidad: 34 },
      { nombre: 'Cinta aislante', unidad: 'UN', requerimientos: 18, incidentes: 8, cantidad: 26 },
      { nombre: 'Patch cord', unidad: 'UN', requerimientos: 12, incidentes: 4, cantidad: 16 },
      { nombre: 'Fuente 12V', unidad: 'UN', requerimientos: 4, incidentes: 3, cantidad: 7 },
      { nombre: 'Balun CCTV', unidad: 'UN', requerimientos: 2, incidentes: 1, cantidad: 3 },
      { nombre: 'Caja de paso', unidad: 'UN', requerimientos: 1, incidentes: 0, cantidad: 1 }
    ],

    insight:
      'El suministro de mayor uso corresponde a Cable UTP.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 18
 ****************************************************/

function getSampleSlide18() {
  return normalizeSlide18Data({
    titulo: 'Yauricocha - Abril 2026 - Suministros en Requerimientos',
    periodo: 'Abril 2026',
    logoText: 'COMM',

    totalSuministrosRequerimientos: 224,

    items: [
      { nombre: 'Cable UTP', unidad: 'mts', cantidad: 80 },
      { nombre: 'Conector RJ45', unidad: 'UN', cantidad: 45 },
      { nombre: 'Cintillos', unidad: 'UN', cantidad: 38 },
      { nombre: 'Canaleta', unidad: 'mts', cantidad: 24 },
      { nombre: 'Cinta aislante', unidad: 'UN', cantidad: 18 },
      { nombre: 'Patch cord', unidad: 'UN', cantidad: 12 },
      { nombre: 'Fuente 12V', unidad: 'UN', cantidad: 4 },
      { nombre: 'Balun CCTV', unidad: 'UN', cantidad: 2 },
      { nombre: 'Caja de paso', unidad: 'UN', cantidad: 1 }
    ],

    insight:
      'El suministro de mayor uso en requerimientos corresponde a Cable UTP.'
  });
}

/****************************************************
 * DATOS DE PRUEBA - SLIDE 19
 ****************************************************/

function getSampleSlide19() {
  return normalizeSlide19Data({
    titulo: 'Yauricocha - Abril 2026 - Suministros en Incidentes',
    periodo: 'Abril 2026',
    logoText: 'COMM',

    totalSuministrosIncidentes: 94,

    items: [
      { nombre: 'Cable UTP', unidad: 'mts', cantidad: 30 },
      { nombre: 'Conector RJ45', unidad: 'UN', cantidad: 22 },
      { nombre: 'Cintillos', unidad: 'UN', cantidad: 16 },
      { nombre: 'Canaleta', unidad: 'mts', cantidad: 10 },
      { nombre: 'Cinta aislante', unidad: 'UN', cantidad: 8 },
      { nombre: 'Patch cord', unidad: 'UN', cantidad: 4 },
      { nombre: 'Fuente 12V', unidad: 'UN', cantidad: 3 },
      { nombre: 'Balun CCTV', unidad: 'UN', cantidad: 1 }
    ],

    insight:
      'El suministro de mayor uso en incidentes corresponde a Cable UTP.'
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
      'La distribución diaria evidencia estabilidad operativa y picos controlados de demanda durante el periodo evaluado.'
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 11
 ****************************************************/

function normalizeSlide11Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.zonas)
      ? body.zonas
      : [];

  let items = rawItems
    .filter(item => item && (item.zona || item.nombre || item.ubicacion || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        return {
          zona: String(item[0] || '').trim(),
          atenciones: toNumber(item[1]),
          horas: toNumber(item[2])
        };
      }

      return {
        zona: String(item.zona || item.nombre || item.ubicacion || '').trim(),
        atenciones: toNumber(item.atenciones ?? item.cantidad ?? item.total ?? 0),
        horas: toNumber(item.horas ?? item.tiempoHoras ?? item.tiempo ?? 0)
      };
    })
    .filter(item => item.zona);

  if (!items.length) {
    items = [
      {
        zona: 'Mina',
        atenciones: toNumber(body.minaAtenciones ?? 72),
        horas: toNumber(body.minaHoras ?? 215)
      },
      {
        zona: 'Superficie',
        atenciones: toNumber(body.superficieAtenciones ?? 65),
        horas: toNumber(body.superficieHoras ?? 176)
      }
    ];
  }

  const totalAtenciones =
    toNumber(body.totalAtenciones) ||
    items.reduce((acc, item) => acc + item.atenciones, 0);

  const totalHoras =
    toNumber(body.totalHoras) ||
    items.reduce((acc, item) => acc + item.horas, 0);

  items = items.map(item => ({
    ...item,
    pctAtenciones: item.pctAtenciones || calcPct(item.atenciones, totalAtenciones),
    pctHoras: item.pctHoras || calcPct(item.horas, totalHoras),
    horasPorAtencion: item.atenciones
      ? (item.horas / item.atenciones).toFixed(2)
      : '0.00'
  }));

  const mina = items.find(item =>
    String(item.zona).toLowerCase().includes('mina')
  ) || items[0];

  const superficie = items.find(item =>
    String(item.zona).toLowerCase().includes('super')
  ) || items[1] || {
    zona: 'Superficie',
    atenciones: 0,
    horas: 0
  };

  const zonaPrincipal =
    mina && mina.atenciones >= superficie.atenciones
      ? mina
      : superficie;

  const diferencia = Math.abs(
    toNumber(mina?.atenciones) - toNumber(superficie?.atenciones)
  );

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Mina vs Superficie`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalAtenciones,
    totalHoras,

    minaAtenciones: mina?.atenciones || 0,
    minaHoras: mina?.horas || 0,
    superficieAtenciones: superficie?.atenciones || 0,
    superficieHoras: superficie?.horas || 0,

    zonaPrincipal: zonaPrincipal?.zona || '-',
    diferencia,

    items,

    insight:
      body.insight ||
      `La mayor concentración de atenciones se presenta en ${zonaPrincipal?.zona || '-'}.`
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

  let items = normalizeParetoItems(rawItems, 'requerimiento');

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

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Top 10 Requerimientos`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalRequerimientos,
    totalTop10,
    totalTiempoHoras,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalRequerimientos),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalRequerimientos),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalRequerimientos),

    items,

    insight:
      body.insight ||
      `La mayor incidencia se concentra en ${top1.nombre}.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 15
 ****************************************************/

function normalizeSlide15Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topIncidentes)
      ? body.topIncidentes
      : [];

  let items = normalizeParetoItems(rawItems, 'incidente');

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalTiempoHoras =
    toNumber(body.totalTiempoHoras ?? body.tiempoTotalHoras ?? body.totalHoras ?? 0) ||
    items.reduce((acc, item) => acc + item.tiempoHoras, 0);

  const totalIncidentes =
    toNumber(body.totalIncidentes ?? body.total ?? body.incidentes ?? 0) ||
    totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalIncidentes)
  }));

  const top1 = items[0] || {
    nombre: '-',
    cantidad: 0,
    tiempoHoras: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Top 10 Incidentes`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalIncidentes,
    totalTop10,
    totalTiempoHoras,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalIncidentes),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalIncidentes),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalIncidentes),

    items,

    insight:
      body.insight ||
      `La mayor incidencia se concentra en ${top1.nombre}.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 17
 ****************************************************/

function normalizeSlide17Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topSuministros)
      ? body.topSuministros
      : [];

  let items = normalizeSuministroItems(rawItems);

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalSuministros =
    toNumber(body.totalSuministros ?? body.total ?? body.suministros ?? 0) ||
    totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalSuministros)
  }));

  const top1 = items[0] || {
    nombre: '-',
    unidad: '-',
    requerimientos: 0,
    incidentes: 0,
    cantidad: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Top Suministros General`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalSuministros,
    totalTop10,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalSuministros),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalSuministros),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalSuministros),

    items,

    insight:
      body.insight ||
      `El suministro de mayor uso corresponde a ${top1.nombre}.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 18
 ****************************************************/

function normalizeSlide18Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topSuministrosRequerimientos)
      ? body.topSuministrosRequerimientos
      : [];

  let items = normalizeSuministroSimpleItems(rawItems);

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalSuministrosRequerimientos =
    toNumber(
      body.totalSuministrosRequerimientos ??
      body.totalSuministros ??
      body.total ??
      0
    ) || totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalSuministrosRequerimientos)
  }));

  const top1 = items[0] || {
    nombre: '-',
    unidad: '-',
    cantidad: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Suministros en Requerimientos`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalSuministrosRequerimientos,
    totalSuministros: totalSuministrosRequerimientos,
    totalTop10,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalSuministrosRequerimientos),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalSuministrosRequerimientos),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalSuministrosRequerimientos),

    items,

    insight:
      body.insight ||
      `El suministro de mayor uso en requerimientos corresponde a ${top1.nombre}.`
  };
}

/****************************************************
 * NORMALIZAR DATOS - SLIDE 19
 ****************************************************/

function normalizeSlide19Data(body) {
  const rawItems = Array.isArray(body.items)
    ? body.items
    : Array.isArray(body.topSuministrosIncidentes)
      ? body.topSuministrosIncidentes
      : [];

  let items = normalizeSuministroSimpleItems(rawItems);

  const totalTop10 = items.reduce((acc, item) => acc + item.cantidad, 0);

  const totalSuministrosIncidentes =
    toNumber(
      body.totalSuministrosIncidentes ??
      body.totalSuministros ??
      body.total ??
      0
    ) || totalTop10;

  items = items.map(item => ({
    ...item,
    porcentaje: item.porcentaje || calcPct(item.cantidad, totalSuministrosIncidentes)
  }));

  const top1 = items[0] || {
    nombre: '-',
    unidad: '-',
    cantidad: 0,
    porcentaje: '0.00%'
  };

  const top2Cantidad = items.slice(0, 2).reduce((acc, item) => acc + item.cantidad, 0);
  const top3Cantidad = items.slice(0, 3).reduce((acc, item) => acc + item.cantidad, 0);

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Suministros en Incidentes`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    totalSuministrosIncidentes,
    totalSuministros: totalSuministrosIncidentes,
    totalTop10,

    pctTop2: body.pctTop2 || calcPct(top2Cantidad, totalSuministrosIncidentes),
    pctTop3: body.pctTop3 || calcPct(top3Cantidad, totalSuministrosIncidentes),
    pctTop10: body.pctTop10 || calcPct(totalTop10, totalSuministrosIncidentes),

    items,

    insight:
      body.insight ||
      `El suministro de mayor uso en incidentes corresponde a ${top1.nombre}.`
  };
}

/****************************************************
 * HELPERS GENERALES
 ****************************************************/

function normalizeParetoItems(rawItems, type) {
  return rawItems
    .filter(item => item && (item.nombre || item.descripcion || item[type] || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        return {
          nombre: String(item[0] || '').trim(),
          cantidad: toNumber(item[1]),
          tiempoHoras: toNumber(item[2])
        };
      }

      return {
        nombre: String(
          item.nombre ||
          item.descripcion ||
          item[type] ||
          item.requerimiento ||
          item.incidente ||
          ''
        ).trim(),

        cantidad: toNumber(item.cantidad ?? item.total ?? item.valor ?? 0),

        tiempoHoras: toNumber(
          item.tiempoHoras ??
          item.tiempo ??
          item.horas ??
          item.totalHoras ??
          0
        )
      };
    })
    .filter(item => item.nombre && item.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10);
}

function normalizeSuministroItems(rawItems) {
  return rawItems
    .filter(item => item && (item.nombre || item.descripcion || item.suministro || item.material || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        const req = toNumber(item[2]);
        const inc = toNumber(item[3]);
        const total = toNumber(item[4]) || req + inc;

        return {
          nombre: String(item[0] || '').trim(),
          unidad: String(item[1] || '-').trim(),
          requerimientos: req,
          incidentes: inc,
          cantidad: total
        };
      }

      const req = toNumber(item.requerimientos ?? item.req ?? item.cantidadRequerimientos ?? 0);
      const inc = toNumber(item.incidentes ?? item.inc ?? item.cantidadIncidentes ?? 0);
      const total = toNumber(item.cantidad ?? item.total ?? item.valor ?? 0) || req + inc;

      return {
        nombre: String(
          item.nombre ||
          item.descripcion ||
          item.suministro ||
          item.material ||
          ''
        ).trim(),

        unidad: String(
          item.unidad ||
          item.um ||
          item.medida ||
          '-'
        ).trim(),

        requerimientos: req,
        incidentes: inc,
        cantidad: total
      };
    })
    .filter(item => item.nombre && item.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10);
}

function normalizeSuministroSimpleItems(rawItems) {
  return rawItems
    .filter(item => item && (item.nombre || item.descripcion || item.suministro || item.material || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        return {
          nombre: String(item[0] || '').trim(),
          unidad: String(item[1] || '-').trim(),
          cantidad: toNumber(item[2])
        };
      }

      return {
        nombre: String(
          item.nombre ||
          item.descripcion ||
          item.suministro ||
          item.material ||
          ''
        ).trim(),

        unidad: String(
          item.unidad ||
          item.um ||
          item.medida ||
          '-'
        ).trim(),

        cantidad: toNumber(item.cantidad ?? item.total ?? item.valor ?? 0)
      };
    })
    .filter(item => item.nombre && item.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10);
}

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
