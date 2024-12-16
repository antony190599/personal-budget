const presupuesto = new Budget();

const formulario = document.getElementById("formulario");
const montoInput = document.getElementById("input-monto");
const tipoInput = document.getElementById("tipo");
const balance = document.getElementById("contenido-balance");
const pIngresos = document.getElementById("contenido-Promedio-Ingresos");
const pGastos = document.getElementById("contenido-Promedio-Gastos");
const historial = document.getElementById("contenido");
const botonOrdenar = document.getElementById("btn-ordenar");

// Actualiza las transacciones en el DOM
function actualizarHistorial() {
    historial.innerHTML = "";
    presupuesto.transactions.forEach(transaction => {
        const elemento = document.createElement("p");
        elemento.textContent = `${transaction.getFormattedDate()} - ${transaction.type}: S/. ${transaction.amount.toFixed(2)}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            presupuesto.remove(transaction.id);
            actualizarUI();
        });

        elemento.appendChild(botonEliminar);
        historial.appendChild(elemento);
    });
}

// Actualiza el balance y los promedios en el DOM
function actualizarUI() {
    balance.textContent = `S/. ${presupuesto.calculateTotal().toFixed(2)}`;
    actualizarPromedios();
    actualizarHistorial();
}

// Calcula y actualiza los promedios de ingresos y gastos
function actualizarPromedios() {
    const ingresos = presupuesto.transactions.filter(t => t.type === "ingreso");
    const gastos = presupuesto.transactions.filter(t => t.type === "gasto");

    const promedioIngresos = ingresos.length ? ingresos.reduce((sum, t) => sum + t.amount, 0) / ingresos.length : 0;
    const promedioGastos = gastos.length ? gastos.reduce((sum, t) => sum + t.amount, 0) / gastos.length : 0;

    pIngresos.textContent = `S/. ${promedioIngresos.toFixed(2)}`;
    pGastos.textContent = `S/. ${promedioGastos.toFixed(2)}`;
}

// Agregar nueva transacción
formulario.addEventListener("submit", event => {
    event.preventDefault();

    const monto = parseFloat(montoInput.value);
    const tipo = tipoInput.value;

    if (validarValor(monto)) {
        const nuevaTransaccion = new Transaction(tipo, monto);
        presupuesto.add(nuevaTransaccion);
        actualizarUI();
        formulario.reset();
    }
});

// Ordenar transacciones por monto
botonOrdenar.addEventListener("click", () => {
    presupuesto.transactions.sort((a, b) => b.amount - a.amount);
    actualizarHistorial();
});

// Inicialización
actualizarUI();
