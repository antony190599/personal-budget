function validarValor(monto) {
    monto = parseFloat(monto);

    if (isNaN(monto)) {
        mostrarMensaje("Por favor, ingrese un número válido.", "error");
        return false;
    }

    if (monto <= 0) {
        mostrarMensaje("El monto debe ser mayor a 0.", "error");
        return false;
    }

    return true;
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById("mensaje-validacion") || document.createElement("div");
    mensajeDiv.id = "mensaje-validacion";
    mensajeDiv.className = tipo === "error" ? "mensaje-error" : "mensaje-exito";
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);
    setTimeout(() => mensajeDiv.remove(), 3000);
}
