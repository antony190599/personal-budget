function Transaction(type, amount) {
    this.id = Date.now();
    this.type = type;
    this.amount = amount;
    this.date = new Date();
}

Transaction.prototype.getFormattedDate = function () {
    return this.date.toLocaleDateString();
};

Transaction.prototype.getSignedAmount = function () {
    return this.type === "ingreso" ? this.amount : -this.amount;
};
