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
  res.redirect('/test-slide13-png');
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Visual engine activo'
  });
});

/****************************************************
 * REGISTRO DE RUTAS POR SLIDE
 ****************************************************/

registerSlide(10, getSampleSlide10, normalizeSlide10Data);
registerSlide(11, getSampleSlide11, normalizeSlide11Data);
registerSlide(12, getSampleSlide12, normalizeSlide12Data);
registerSlide(13, getSampleSlide13, normalizeSlide13Data);
registerSlide(14, getSampleSlide14, normalizeSlide14Data);
registerSlide(15, getSampleSlide15, normalizeSlide15Data);
registerSlide(17, getSampleSlide17, normalizeSlide17Data);
registerSlide(18, getSampleSlide18, normalizeSlide18Data);
registerSlide(19, getSampleSlide19, normalizeSlide19Data);

function registerSlide(slideNumber, getSampleData, normalizeData) {
  app.get(`/test-slide${slideNumber}`, async (req, res) => {
    try {
      const sample = getSampleData();
      res.render(`slide${slideNumber}`, sample);
    } catch (error) {
      console.error(`Error en /test-slide${slideNumber}:`, error);
      res.status(500).send(`Error en /test-slide${slideNumber}: ` + error);
    }
  });

  app.get(`/test-slide${slideNumber}-png`, async (req, res) => {
    try {
      const sample = getSampleData();
      const html = await renderEjsToString(`slide${slideNumber}`, sample);
      const imageBuffer = await htmlToPng(html);

      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Length', imageBuffer.length);
      res.end(imageBuffer);
    } catch (error) {
      console.error(`Error generando PNG slide ${slideNumber}:`, error);
      res.status(500).send(`Error generando PNG slide ${slideNumber}: ` + error);
    }
  });

  app.post(`/render/slide${slideNumber}`, async (req, res) => {
    try {
      const data = normalizeData(req.body || {});
      const html = await renderEjsToString(`slide${slideNumber}`, data);
      const imageBuffer = await htmlToPng(html);

      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Length', imageBuffer.length);
      res.end(imageBuffer);
    } catch (error) {
      console.error(`Error renderizando slide${slideNumber}:`, error);
      res.status(500).json({
        ok: false,
        error: String(error)
      });
    }
  });
}

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
    titulo: 'Yauricocha - Abril 2026 - Atenciones por Tipo y Evolución Mensual',
    periodo: 'Abril 2026',
    logoText: 'COMM',

    meses: [
      { mes: 'Ene-26', mina: 137, superficie: 23, total: 160 },
      { mes: 'Feb-26', mina: 133, superficie: 10, total: 143 },
      { mes: 'Mar-26', mina: 128, superficie: 21, total: 149 },
      { mes: 'Abr-26', mina: 121, superficie: 16, total: 137 }
    ],

    totalAtenciones: 589,
    totalMinaGlobal: 519,
    totalSuperficieGlobal: 70,
    totalMesActualValue: 137,

    insight:
      'Predominio de atenciones en la operación minera (88.1%), evidenciando enfoque en servicios preventivos y controlados.'
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
 * DATOS DE PRUEBA - SLIDE 13
 ****************************************************/

function getSampleSlide13() {
  return normalizeSlide13Data({
    titulo: 'Yauricocha - Abril 2026 - Detalle de Requerimientos e Incidentes',
    periodo: 'Abril 2026',
    logoText: 'COMM',

    totalRequerimientos: 1569,
    totalIncidentes: 691,
    totalAtenciones: 2260,
    participacionRequerimientos: '69%',
    participacionIncidentes: '31%',
    promedioMensualTotal: '226.0',

    meses: [
      { mes: 'Jul-25', incidentes: 81, requerimientos: 176 },
      { mes: 'Ago-25', incidentes: 77, requerimientos: 180 },
      { mes: 'Set-25', incidentes: 81, requerimientos: 190 },
      { mes: 'Oct-25', incidentes: 100, requerimientos: 178 },
      { mes: 'Nov-25', incidentes: 90, requerimientos: 224 },
      { mes: 'Dic-25', incidentes: 73, requerimientos: 216 },
      { mes: 'Ene-26', incidentes: 47, requerimientos: 82 },
      { mes: 'Feb-26', incidentes: 50, requerimientos: 90 },
      { mes: 'Mar-26', incidentes: 53, requerimientos: 113 },
      { mes: 'Abr-26', incidentes: 39, requerimientos: 120 }
    ],

    insight:
      'La gestión operativa se mantiene eficiente, con una alta participación de requerimientos (69%) frente a incidentes (31%), lo que evidencia un entorno controlado y predecible.'
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
  const rawMeses = Array.isArray(body.meses)
    ? body.meses
    : Array.isArray(body.mensualItems)
      ? body.mensualItems
      : [];

  let meses = rawMeses
    .filter(item => item && (item.mes || item.periodo || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        const mina = toNumber(item[1]);
        const superficie = toNumber(item[2]);
        const total = toNumber(item[3]) || mina + superficie;

        return {
          mes: String(item[0] || '').trim(),
          mina,
          superficie,
          total
        };
      }

      const mina = toNumber(
        item.mina ??
        item.im ??
        item.atencionesMina ??
        item.interiorMina ??
        0
      );

      const superficie = toNumber(
        item.superficie ??
        item.sup ??
        item.atencionesSuperficie ??
        0
      );

      const total = toNumber(
        item.total ??
        item.atenciones ??
        item.cantidad ??
        0
      ) || mina + superficie;

      return {
        mes: String(item.mes || item.periodo || '').trim(),
        mina,
        superficie,
        total
      };
    })
    .filter(item => item.mes);

  if (!meses.length) {
    meses = [
      { mes: 'Ene-26', mina: 137, superficie: 23, total: 160 },
      { mes: 'Feb-26', mina: 133, superficie: 10, total: 143 },
      { mes: 'Mar-26', mina: 128, superficie: 21, total: 149 },
      { mes: 'Abr-26', mina: 121, superficie: 16, total: 137 }
    ];
  }

  const totalMinaGlobal =
    toNumber(body.totalMinaGlobal ?? body.minaAtenciones ?? body.totalMina ?? 0) ||
    meses.reduce((acc, item) => acc + item.mina, 0);

  const totalSuperficieGlobal =
    toNumber(body.totalSuperficieGlobal ?? body.superficieAtenciones ?? body.totalSuperficie ?? 0) ||
    meses.reduce((acc, item) => acc + item.superficie, 0);

  const totalAtenciones =
    toNumber(body.totalAtenciones ?? body.totalGeneral ?? 0) ||
    meses.reduce((acc, item) => acc + item.total, 0) ||
    totalMinaGlobal + totalSuperficieGlobal;

  const mesActual = meses[meses.length - 1] || {
    mes: '-',
    mina: 0,
    superficie: 0,
    total: 0
  };

  const totalMesActualValue =
    toNumber(body.totalMesActualValue ?? body.totalMesActual ?? body.totalPeriodo ?? 0) ||
    mesActual.total;

  const participacionMina =
    body.participacionMina ||
    calcPctOneDecimal(totalMinaGlobal, totalAtenciones);

  const participacionSuperficie =
    body.participacionSuperficie ||
    calcPctOneDecimal(totalSuperficieGlobal, totalAtenciones);

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Atenciones por Tipo y Evolución Mensual`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    meses,
    mensualItems: meses,

    totalAtenciones,
    totalMinaGlobal,
    totalSuperficieGlobal,

    minaAtenciones: totalMinaGlobal,
    superficieAtenciones: totalSuperficieGlobal,

    participacionMina,
    participacionSuperficie,

    totalMesActualValue,

    insight:
      body.insight ||
      `Predominio de atenciones en la operación minera (${participacionMina}), evidenciando enfoque en servicios preventivos y controlados.`
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
 * NORMALIZAR DATOS - SLIDE 13
 ****************************************************/

function normalizeSlide13Data(body) {
  const rawMeses = Array.isArray(body.meses)
    ? body.meses
    : Array.isArray(body.mensualItems)
      ? body.mensualItems
      : [];

  let meses = rawMeses
    .filter(item => item && (item.mes || item.periodo || item[0]))
    .map(item => {
      if (Array.isArray(item)) {
        return {
          mes: String(item[0] || '').trim(),
          incidentes: toNumber(item[1]),
          requerimientos: toNumber(item[2])
        };
      }

      return {
        mes: String(item.mes || item.periodo || '').trim(),
        incidentes: toNumber(
          item.incidentes ??
          item.incidente ??
          item.inc ??
          0
        ),
        requerimientos: toNumber(
          item.requerimientos ??
          item.requerimiento ??
          item.req ??
          0
        )
      };
    })
    .filter(item => item.mes);

  if (!meses.length) {
    meses = [
      { mes: 'Jul-25', incidentes: 81, requerimientos: 176 },
      { mes: 'Ago-25', incidentes: 77, requerimientos: 180 },
      { mes: 'Set-25', incidentes: 81, requerimientos: 190 },
      { mes: 'Oct-25', incidentes: 100, requerimientos: 178 },
      { mes: 'Nov-25', incidentes: 90, requerimientos: 224 },
      { mes: 'Dic-25', incidentes: 73, requerimientos: 216 },
      { mes: 'Ene-26', incidentes: 47, requerimientos: 82 },
      { mes: 'Feb-26', incidentes: 50, requerimientos: 90 },
      { mes: 'Mar-26', incidentes: 53, requerimientos: 113 },
      { mes: 'Abr-26', incidentes: 39, requerimientos: 120 }
    ];
  }

  const totalRequerimientos =
    toNumber(body.totalRequerimientos ?? body.requerimientos ?? 0) ||
    meses.reduce((acc, item) => acc + item.requerimientos, 0);

  const totalIncidentes =
    toNumber(body.totalIncidentes ?? body.incidentes ?? 0) ||
    meses.reduce((acc, item) => acc + item.incidentes, 0);

  const totalAtenciones =
    toNumber(body.totalAtenciones ?? body.total ?? 0) ||
    totalRequerimientos + totalIncidentes;

  const participacionRequerimientos =
    body.participacionRequerimientos ||
    calcPctNoDecimal(totalRequerimientos, totalAtenciones);

  const participacionIncidentes =
    body.participacionIncidentes ||
    calcPctNoDecimal(totalIncidentes, totalAtenciones);

  const promedioMensualTotal =
    body.promedioMensualTotal ||
    (meses.length ? (totalAtenciones / meses.length).toFixed(1) : '0.0');

  return {
    titulo:
      body.titulo ||
      `Yauricocha - ${body.periodo || 'Periodo'} - Detalle de Requerimientos e Incidentes`,

    periodo: body.periodo || 'Periodo',
    logoText: body.logoText || 'COMM',

    meses,
    mensualItems: meses,

    totalRequerimientos,
    totalIncidentes,
    totalAtenciones,

    participacionRequerimientos,
    participacionIncidentes,
    promedioMensualTotal,

    insight:
      body.insight ||
      `La gestión operativa se mantiene eficiente, con una alta participación de requerimientos (${participacionRequerimientos}) frente a incidentes (${participacionIncidentes}), lo que evidencia un entorno controlado y predecible.`
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

function calcPctOneDecimal(value, total) {
  if (!total) return '0.0%';
  return ((Number(value) / Number(total)) * 100).toFixed(1) + '%';
}

function calcPctNoDecimal(value, total) {
  if (!total) return '0%';
  return Math.round((Number(value) / Number(total)) * 100) + '%';
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

    const stylePath = path.join(__dirname, 'public', 'styles.css');

    if (fs.existsSync(stylePath)) {
      await page.addStyleTag({
        path: stylePath
      });
    }

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
