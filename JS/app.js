class Almacenar {
  constructor(fecha, tipo, monto) {
      this.fecha = fecha;
      this.tipo = tipo;
      this.monto = monto;
  }
}

// Elementos del DOM
const formulario = document.getElementById('formulario');
const montoInput = document.getElementById('input-monto');
const tipoSelect = document.getElementById('tipo');
const botonOrdenar = document.getElementById('btn-ordenar');
const balanceDisplay = document.getElementById("contenido-balance");
const ingresosDisplay = document.getElementById("contenido-Promedio-Ingresos");
const gastosDisplay = document.getElementById("contenido-Promedio-Gastos");
const historial = document.getElementById("contenido");

const transacciones = [];
let balance = 0;

// Funciones Utilitarias
const formatearMonto = (monto, moneda) => `${moneda} ${monto.toFixed(2)}`;

const actualizarDisplays = () => {
  const ingresos = transacciones
      .filter(t => t.tipo === 'ingreso')
      .reduce((acc, t) => acc + t.monto, 0);

  const gastos = transacciones
      .filter(t => t.tipo === 'gasto')
      .reduce((acc, t) => acc + t.monto, 0);

  balance = ingresos - gastos;

  balanceDisplay.textContent = formatearMonto(balance, "S/.");
  ingresosDisplay.textContent = formatearMonto(ingresos, "S/.");
  gastosDisplay.textContent = formatearMonto(gastos, "S/.");
};

const validarMonto = monto => {
  if (isNaN(monto) || monto <= 0) {
      alert("Por favor, ingrese un monto válido.");
      return false;
  }
  return true;
};

const crearElementoTransaccion = ({ fecha, tipo, monto }) => {
  const elemento = document.createElement("p");
  const signo = tipo === "ingreso" ? "+" : "-";
  elemento.textContent = `${fecha}: ${tipo} ${signo}${monto}`;
  return elemento;
};

// Eventos
formulario.addEventListener('submit', function (event) {
  event.preventDefault();

  const monto = parseFloat(montoInput.value);
  const tipo = tipoSelect.value;

  if (!validarMonto(monto)) return;

  const fecha = new Date().toLocaleString();
  const nuevaTransaccion = new Almacenar(fecha, tipo, monto);

  transacciones.push(nuevaTransaccion);
  historial.appendChild(crearElementoTransaccion(nuevaTransaccion));

  actualizarDisplays();
  formulario.reset();
});

botonOrdenar.addEventListener('click', function () {
  historial.innerHTML = "";

  transacciones.sort((a, b) => {
      if (a.tipo !== b.tipo) return a.tipo.localeCompare(b.tipo);
      return b.monto - a.monto;
  });

  transacciones.forEach(transaccion => {
      historial.appendChild(crearElementoTransaccion(transaccion));
  });
});

// Inicialización
actualizarDisplays();
