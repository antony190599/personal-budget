function Transaction(id, description, amount, type, date, tags = []) {
    this.id = id;
    this.description = description.trim();
    this.amount = amount;
    this.type = type.toLowerCase();
    this.date = date;
    this.tags = Array.isArray(tags) ? tags : [];
}

// Actualiza las categorías de todas las transacciones
Transaction.prototype.updateCategories = function(newCategory) {
    this.tags = this.tags.map(tag => (tag === newCategory.old ? newCategory.new : tag));
};

// Verifica si hay transacciones mayores a un monto
Transaction.prototype.hasTransactionsOverAmount = function(amount) {
    return this.amount > amount;
};

// Verifica si todas las transacciones son válidas (montos positivos)
Transaction.prototype.areAllTransactionsValid = function() {
    return this.amount >= 0;
};

// Normaliza el tipo de transacción ('ingreso' o 'gasto')
Transaction.prototype.getTransactionType = function() {
    return this.type.toLowerCase();
};

// Divide un string de tags en un array
Transaction.prototype.splitTags = function(tagsString) {
    return tagsString.split(",").map(tag => tag.trim());
};
