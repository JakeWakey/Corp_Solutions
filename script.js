document.getElementById("registroForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtener los campos del formulario
    const cedula = document.getElementById("cedula");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const departamento = document.getElementById("departamento");
    const motivo = document.getElementById("motivo");

    // Limpiar mensajes de error previos
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => (msg.textContent = ""));

    let isValid = true;

    // Validar número de cédula
    const cedulaRegex = /^\d{3}-\d{6}-\d{4}[A-Za-z]$/;
    if (!cedula.value.trim()) {
        setError(cedula, "El número de cédula es obligatorio.");
        isValid = false;
    } else if (!cedulaRegex.test(cedula.value)) {
        setError(cedula, "El número de cédula debe tener el formato 999-999999-9999X.");
        isValid = false;
    }

    // Validar nombres
    if (!nombre.value.trim()) {
        setError(nombre, "El nombre es obligatorio.");
        isValid = false;
    }

    // Validar apellidos
    if (!apellido.value.trim()) {
        setError(apellido, "El apellido es obligatorio.");
        isValid = false;
    }

    // Validar departamento
    if (!departamento.value.trim()) {
        setError(departamento, "Debe seleccionar un departamento.");
        isValid = false;
    }

    // Validar motivo
    if (!motivo.value.trim()) {
        setError(motivo, "El motivo de la visita es obligatorio.");
        isValid = false;
    }

    // Si todo es válido, mostrar mensaje de éxito y agregar datos a la tabla
    if (isValid) {
        document.getElementById("smsConfi").textContent = "Registro exitoso.";
        document.getElementById("smsConfi").classList.add("success");

        // Agregar los datos a la tabla
        const tabla = document.getElementById("tablaRegistros").querySelector("tbody");
        const nuevaFila = document.createElement("tr");

        nuevaFila.innerHTML = `
            <td>${cedula.value}</td>
            <td>${nombre.value}</td>
            <td>${apellido.value}</td>
            <td>${departamento.options[departamento.selectedIndex].text}</td>
            <td>${motivo.value}</td>
        `;

        tabla.appendChild(nuevaFila);

        // Limpiar el formulario
        cedula.value = "";
        nombre.value = "";
        apellido.value = "";
        departamento.value = "";
        motivo.value = "";
    } else {
        document.getElementById("smsConfi").textContent = "";
        document.getElementById("smsConfi").classList.remove("success");
    }
});

// Función para establecer mensajes de error
function setError(input, message) {
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = message;
}