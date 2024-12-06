// Array para almacenar las transacciones
let transactions = [];

// Manejar el envío del formulario
document.getElementById("transaction-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener datos del formulario
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (isNaN(amount) || amount <= 0) {
    alert("Por favor, ingrese un monto válido.");
    return;
  }

  // Obtener fecha actual
  const date = new Date().toLocaleDateString();

  // Agregar transacción
  transactions.push({ date, type, amount });
  renderTransactions();

  // Limpiar el formulario
  this.reset();
});

// Función para renderizar las transacciones
function renderTransactions() {
  const transactionList = document.getElementById("transaction-list");
  transactionList.innerHTML = ""; // Limpiar la lista actual

  transactions.forEach((transaction) => {
    // Crear elemento de lista
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    // Aplicar estilo según el tipo de transacción
    const textColor = transaction.type === "income" ? "text-success" : "text-danger";

    // Contenido del elemento
    listItem.innerHTML = `
      <span>${transaction.date}</span>
      <span class="${textColor} fw-bold">${transaction.type === "income" ? "+" : "-"}$${transaction.amount.toFixed(2)}</span>
    `;

    transactionList.appendChild(listItem);
  });
}

// Manejar el botón para ordenar transacciones
document.getElementById("sort-button").addEventListener("click", function () {
  // Ordenar primero por tipo (income antes que expense) y luego por monto de mayor a menor
  transactions.sort((a, b) => {
    if (a.type === b.type) {
      return b.amount - a.amount; // Ordenar por monto si el tipo es igual
    }
    return a.type === "income" ? -1 : 1; // Ingreso primero, gasto después
  });

  renderTransactions();
});
