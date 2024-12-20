function Budget() {
    this.transactions = [];
}

// Busca una transacción por su ID
Budget.prototype.findTransactionById = function(id) {
    return this.transactions.find(transaction => transaction.id === id);
};

// Filtra las transacciones por tipo (Ingreso o Gasto)
Budget.prototype.filterTransactionsByType = function(type) {
    return this.transactions.filter(transaction => transaction.type.toLowerCase() === type.toLowerCase());
};

// Calcula el total de un tipo específico (Ingreso o Gasto)
Budget.prototype.getTotalByType = function(type) {
    return this.filterTransactionsByType(type).reduce((acc, transaction) => acc + transaction.amount, 0);
};

// Agrega una transacción al presupuesto
Budget.prototype.addTransaction = function(transaction) {
    if (!transaction || !transaction.id) return false;
    this.transactions.push(transaction);
    return true;
};

// Elimina una transacción por su ID
Budget.prototype.deleteTransaction = function(id) {
    const index = this.transactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
        this.transactions.splice(index, 1);
        return true;
    }
    return false;
};
