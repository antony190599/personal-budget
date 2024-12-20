function App() {
    this.budget = new Budget();
}

// Busca transacciones por descripción
App.prototype.searchTransactions = function (query) {
    if (!query) return this.budget.transactions;
    return this.budget.transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(query.toLowerCase())
    );
};

// Formatea los montos como "1,000.00"
App.prototype.formatAmount = function (amount) {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


App.prototype.getMonthName = function (date) {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const monthIndex = new Date(date).getMonth();
    return months[monthIndex];
};

// Agrega una transacción
App.prototype.addTransaction = function (transaction) {
    const success = this.budget.addTransaction(transaction);
    if (success) {
        this.updateUI();
    } else {
        mostrarMensaje("No se pudo agregar la transacción.", "error");
    }
    return success;
};

// Elimina una transacción por ID
App.prototype.deleteTransaction = function (id) {
    const success = this.budget.deleteTransaction(id);
    if (success) {
        this.updateUI();
    } else {
        mostrarMensaje("No se pudo eliminar la transacción.", "error");
    }
    return success;
};

// Actualiza la UI
App.prototype.updateUI = function () {
    const balance = this.budget.transactions.reduce((acc, t) => acc + t.amount, 0);
    const income = this.budget.getTotalByType("ingreso");
    const expenses = this.budget.getTotalByType("gasto");

    document.getElementById("balance-total").innerText = `S/. ${this.formatAmount(balance)}`;
    document.getElementById("income-total").innerText = `S/. ${this.formatAmount(income)}`;
    document.getElementById("expense-total").innerText = `S/. ${this.formatAmount(expenses)}`;
    this.renderTransactions();
};

// Renderiza las transacciones
App.prototype.renderTransactions = function () {
    const history = document.getElementById("transaction-history");
    history.innerHTML = "";

    this.budget.transactions.forEach(transaction => {
        const row = document.createElement("div");
        row.classList.add("transaction-row");

        const date = document.createElement("span");
        date.innerText = this.getMonthName(transaction.date);

        const description = document.createElement("span");
        description.innerText = transaction.description;

        const amount = document.createElement("span");
        amount.innerText = `S/. ${this.formatAmount(transaction.amount)}`;
        amount.classList.add(transaction.type === "ingreso" ? "income" : "expense");

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.onclick = () => this.deleteTransaction(transaction.id);

        row.appendChild(date);
        row.appendChild(description);
        row.appendChild(amount);
        row.appendChild(deleteButton);

        history.appendChild(row);
    });
};

// Inicializa la app
const app = new App();

// Evento para agregar una nueva transacción
document.getElementById("transaction-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const date = new Date().toISOString();

    if (description && !isNaN(amount) && validarValor(amount)) {
        const transaction = new Transaction(Date.now(), description, amount, type, date);
        app.addTransaction(transaction);

        // Limpiar el formulario
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("type").value = "ingreso";
    } else {
        mostrarMensaje("Por favor, complete todos los campos correctamente.", "error");
    }
});

// Evento para buscar transacciones por descripción
document.getElementById("search").addEventListener("input", (e) => {
    const query = e.target.value;
    const filteredTransactions = app.searchTransactions(query);
    app.renderFilteredTransactions(filteredTransactions);
});

// Renderiza solo las transacciones filtradas
App.prototype.renderFilteredTransactions = function (transactions) {
    const history = document.getElementById("transaction-history");
    history.innerHTML = "";

    transactions.forEach(transaction => {
        const row = document.createElement("div");
        row.classList.add("transaction-row");

        const date = document.createElement("span");
        date.innerText = this.getMonthName(transaction.date);

        const description = document.createElement("span");
        description.innerText = transaction.description;

        const amount = document.createElement("span");
        amount.innerText = `S/. ${this.formatAmount(transaction.amount)}`;
        amount.classList.add(transaction.type === "ingreso" ? "income" : "expense");

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.onclick = () => this.deleteTransaction(transaction.id);

        row.appendChild(date);
        row.appendChild(description);
        row.appendChild(amount);
        row.appendChild(deleteButton);

        history.appendChild(row);
    });
};
