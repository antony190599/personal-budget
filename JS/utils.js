const calcularBalance = (transacciones) => {
    return transacciones.reduce((total, trans) => {
        
        if (trans.tipo === 'gasto') {
            return total - trans.monto; 
        } else {
            return total + trans.monto; 
        }
    }, 0); 
}
function formatearMonto(monto, moneda){
return moneda+" "+monto;
}