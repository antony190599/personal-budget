function Budget() {
    this.transactions = [];
}

Budget.prototype.add = function (transaction) {
    this.transactions.push(transaction);
};

Budget.prototype.remove = function (id) {
    this.transactions = this.transactions.filter(transaction => transaction.id !== id);
};

Budget.prototype.calculateTotal = function () {
    return this.transactions.reduce((total, transaction) => total + transaction.getSignedAmount(), 0);
};
