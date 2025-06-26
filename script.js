document.addEventListener('DOMContentLoaded', function() {
    // ESTA ES LA URL DE TU GOOGLE APPS SCRIPT
    // ¡REEMPLAZA "TU_URL_DE_APPS_SCRIPT_AQUI" CON LA URL REAL DE TU DEPLOYMENT PARA LAS PRE-RESERVAS!
    const appsScriptURL = "https://script.google.com/macros/s/AKfycbzrCzIoSm5-7HTQ0XlAlbH6jLr21S4NVPuPkePO0J_HQ2B-cD2kkuh4TCgFE15-MSlr/exec";

    // Set today's date
    const today = new Date().toISOString().slice(0, 10);
    document.getElementById('fechaHoy').value = today;

    // Generate initial reservation ID (consider moving this to Apps Script for uniqueness)
    // For client-side, this generates a random ID. If you need it to be unique across all submissions,
    // it's better to get it from the server side (Apps Script).
    document.getElementById('idPreReserva').value = '0' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');

    // Populate Vendedor dropdown
    const vendedores = ['VAQUERO', 'TURBO', 'LUISA', 'DUDU', 'CHELO', 'LUCAS', 'FISU', 'NICO', 'NUESTRO', 'LUCHO'];
    const vendedorSelect = document.getElementById('vendedor');
    vendedores.forEach(vendedor => {
        const option = document.createElement('option');
        option.value = vendedor;
        option.textContent = vendedor;
        vendedorSelect.appendChild(option);
    });

    // Function to generate dynamic pax fields
    document.getElementById('cantidadPasajeros').addEventListener('input', function() {
        const numPax = parseInt(this.value) || 0;
        const paxFieldsContainer = document.getElementById('paxFieldsContainer');
        paxFieldsContainer.innerHTML = ''; // Clear existing fields

        for (let i = 1; i <= numPax; i++) {
            const paxGroup = document.createElement('div');
            paxGroup.className = 'pax-group';
            paxGroup.innerHTML = `
                <h5>Detalle Pasajero ${i}</h5>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="tablasPax${i}">Tablas</label>
                        <select class="form-control" id="tablasPax${i}" name="TABLAS_PAX${i}">
                            <option value="">SELECCIONE</option>
                            <option value="SKI COMPLETO HEAD">SKI COMPLETO HEAD</option>
                            <option value="SKI COMPLETO FISHER">SKI COMPLETO FISHER</option>
                            <option value="SKI COMPLETO VOLKL">SKI COMPLETO VOLKL</option>
                            <option value="SKI JUNIOR">SKI JUNIOR</option>
                            <option value="BASTONES">BASTONES</option>
                            <option value="SNOW COMPLETO">SNOW COMPLETO</option>
                            <option value="TABLA SNOW">TABLA SNOW</option>
                            <option value="TABLA SKI">TABLA SKI</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="botasPax${i}">Botas</label>
                        <select class="form-control" id="botasPax${i}" name="BOTAS_PAX${i}">
                            <option value="">SELECCIONE</option>
                            <option value="SKI COMPLETO HEAD">SKI COMPLETO HEAD</option>
                            <option value="SKI COMPLETO FISHER">SKI COMPLETO FISHER</option>
                            <option value="SKI COMPLETO VOLKL">SKI COMPLETO VOLKL</option>
                            <option value="SKI JUNIOR">SKI JUNIOR</option>
                            <option value="SNOW BOTAS">SNOW BOTAS</option>
                            <option value="SKI BOTAS">SKI BOTAS</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="ropaPax${i}">Ropa</label>
                        <select class="form-control" id="ropaPax${i}" name="ROPA_PAX${i}">
                            <option value="">SELECCIONE</option>
                            <option value="ROPA COMPLETO">ROPA COMPLETO</option>
                            <option value="CAMPERA">CAMPERA</option>
                            <option value="PANTALON">PANTALON</option>
                            <option value="GUANTES">GUANTES</option>
                            <option value="PRE - SKI">PRE - SKI</option>
                            <option value="PANT - GUAN">PANT - GUAN</option>
                            <option value="PANT - GUAN - PRE SKI">PANT - GUAN - PRE SKI</option>
                            <option value="PANT - PRE SKI">PANT - PRE SKI</option>
                            <option value="CAMP - GUANTES">CAMP - GUANTES</option>
                            <option value="CAMP - GUANTES - PRE SKI">CAMP - GUANTES - PRE SKI</option>
                            <option value="CAMP - PRE SKI">CAMP - PRE SKI</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="cascoAntiparrasPax${i}">Casco y Antiparra</label>
                        <select class="form-control" id="cascoAntiparrasPax${i}" name="CASCO_Y_ANTIPARRAS_PAX${i}">
                            <option value="">SELECCIONE</option>
                            <option value="CASCO Y ANTIPARRAS">CASCO Y ANTIPARRAS</option>
                            <option value="CASCO">CASCO</option>
                            <option value="ANTIPARRAS">ANTIPARRAS</option>
                            <option value="TRINEO MEDIANO">TRINEO MEDIANO</option>
                            <option value="TRINEO DOBLE">TRINEO DOBLE</option>
                            <option value="CULI PATIN">CULI PATIN</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="clasesPax${i}">Clases</label>
                        <select class="form-control" id="clasesPax${i}" name="CLASES_PAX${i}">
                            <option value="">SELECCIONE</option>
                            <option value="SIN CLASE">SIN CLASE</option>
                            <option value="SKI GRUPAL">SKI GRUPAL</option>
                            <option value="SNOW GRUPAL">SNOW GRUPAL</option>
                            <option value="SKI PRIVADA">SKI PRIVADA</option>
                            <option value="SNOW PRIVADA">SNOW PRIVADA</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="montoAlquilerPax${i}">Monto Alquiler PAX ${i}</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="number" class="form-control monto-alquiler-pax" id="montoAlquilerPax${i}" name="MONTO_ALQUILER_PAX${i}" step="0.01" value="0">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="montoClasePax${i}">Monto Clase PAX ${i}</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type="number" class="form-control monto-clase-pax" id="montoClasePax${i}" name="MONTO_CLASE_PAX${i}" step="0.01" value="0">
                    </div>
                </div>
            `;
            paxFieldsContainer.appendChild(paxGroup);
        }

        // Después de generar los campos, adjuntar los listeners
        addPaxAmountListeners();
        // Recalcular los totales después de (re)generar los campos de pax
        calculateTotalAlquilerFromPax();
        calculateTotalClasesFromPax();
    });

    // Inicializa los campos de pasajero al cargar la página para 1 pasajero
    document.getElementById('cantidadPasajeros').dispatchEvent(new Event('input'));


    // --- Nuevas funciones para sumar montos de pasajeros ---
    function addPaxAmountListeners() {
        const montoAlquilerPaxInputs = document.querySelectorAll('.monto-alquiler-pax');
        montoAlquilerPaxInputs.forEach(input => {
            // Eliminar listeners previos para evitar duplicados al regenerar
            input.removeEventListener('input', calculateTotalAlquilerFromPax);
            input.addEventListener('input', calculateTotalAlquilerFromPax);
        });

        const montoClasePaxInputs = document.querySelectorAll('.monto-clase-pax');
        montoClasePaxInputs.forEach(input => {
            // Eliminar listeners previos para evitar duplicados al regenerar
            input.removeEventListener('input', calculateTotalClasesFromPax);
            input.addEventListener('input', calculateTotalClasesFromPax);
        });
    }

    function calculateTotalAlquilerFromPax() {
        let totalAlquiler = 0;
        const montoAlquilerPaxInputs = document.querySelectorAll('.monto-alquiler-pax');
        montoAlquilerPaxInputs.forEach(input => {
            totalAlquiler += parseFloat(input.value) || 0;
        });
        document.getElementById('montoTotalAlquiler').value = totalAlquiler.toFixed(2);
        calculateMontoTotalFinal(); // Recalcular el monto final cuando cambia el total de alquiler
    }

    function calculateTotalClasesFromPax() {
        let totalClases = 0;
        const montoClasePaxInputs = document.querySelectorAll('.monto-clase-pax');
        montoClasePaxInputs.forEach(input => {
            totalClases += parseFloat(input.value) || 0;
        });
        document.getElementById('montoTotalClases').value = totalClases.toFixed(2);
        calculateMontoTotalFinal(); // Recalcular el monto final cuando cambia el total de clases
    }
    // --- Fin de nuevas funciones ---


    // --- Lógica de cálculo automático de Monto Total Final ---
    function calculateMontoTotalFinal() {
        const montoAlquiler = parseFloat(document.getElementById('montoTotalAlquiler').value) || 0;
        const montoClases = parseFloat(document.getElementById('montoTotalClases').value) || 0;
        const descuento = parseFloat(document.getElementById('descuento').value) || 0;
        const montoTotalFinalInput = document.getElementById('montoTotalFinal');

        let total = montoAlquiler + montoClases - descuento;
        montoTotalFinalInput.value = total.toFixed(2); // Formatear a 2 decimales

        calculateRestaPagar();
    }

    // Escuchar cambios en los campos relevantes para actualizar Monto Total Final
    document.getElementById('montoTotalAlquiler').addEventListener('input', calculateMontoTotalFinal);
    document.getElementById('montoTotalClases').addEventListener('input', calculateMontoTotalFinal);
    document.getElementById('descuento').addEventListener('input', calculateMontoTotalFinal);
    // --- Fin de la lógica de cálculo automático de Monto Total Final ---


    // --- Lógica de manejo de campos de pago (SI_PAGO_TOTAL, TIPO_DE_PAGO, MONTO_PAGADO) ---
    // Asegurarse de que esta función se llame cuando cambia 'siPagoTotal'
    document.getElementById('siPagoTotal').addEventListener('change', togglePaymentFields);

    window.togglePaymentFields = function() {
        const siPagoTotal = document.getElementById('siPagoTotal').value;
        const metodoPagoGroup = document.getElementById('metodoPagoGroup');
        const pagoParcialGroup = document.getElementById('pagoParcialGroup');
        const restaPagarGroup = document.getElementById('restaPagarGroup');
        const montoTotalFinal = parseFloat(document.getElementById('montoTotalFinal').value) || 0;
        const pagoParcialInput = document.getElementById('pagoParcial'); // Esto debería ser 'montoPagado' en el HTML si 'pagoParcial' es el monto real pagado
        const restaPagarInput = document.getElementById('restaPagar');
        const tipoDePagoSelect = document.getElementById('tipoDePago');
        const montoPagadoInput = document.getElementById('montoPagado'); // Este es el campo que usas para enviar a la hoja

        if (siPagoTotal === 'SI') {
            metodoPagoGroup.style.display = 'block';
            pagoParcialGroup.style.display = 'none'; // Oculta el campo de "Pago Parcial"
            restaPagarGroup.style.display = 'none'; // Oculta el campo de "Resta a Pagar"
            
            pagoParcialInput.value = montoTotalFinal.toFixed(2); // Ajusta este valor si 'pagoParcialInput' es realmente 'montoPagado'
            restaPagarInput.value = (0).toFixed(2); // Resta a pagar es 0
            tipoDePagoSelect.value = 'TOTAL';
            montoPagadoInput.value = montoTotalFinal.toFixed(2); // MONTO_PAGADO es el total
        } else if (siPagoTotal === 'NO') {
            metodoPagoGroup.style.display = 'block';
            pagoParcialGroup.style.display = 'block';
            restaPagarGroup.style.display = 'block';
            
            pagoParcialInput.value = ''; // Limpiar el pago parcial si cambia a "No"
            restaPagarInput.value = ''; // Limpiar resta
            tipoDePagoSelect.value = 'PARCIAL';
            montoPagadoInput.value = ''; // Limpiar monto pagado
        } else { // Si se selecciona la opción vacía
            metodoPagoGroup.style.display = 'none';
            pagoParcialGroup.style.display = 'none';
            restaPagarGroup.style.display = 'none';
            pagoParcialInput.value = '';
            restaPagarInput.value = '';
            tipoDePagoSelect.value = '';
            montoPagadoInput.value = '';
        }
        calculateRestaPagar(); // Recalcular después de cambiar la visibilidad
    };

    // Calculate 'Resta a Pagar' dynamically and update 'Monto Pagado' based on 'Tipo de Pago'
    document.getElementById('pagoParcial').addEventListener('input', calculateRestaPagar);

    function calculateRestaPagar() {
        const montoTotalFinal = parseFloat(document.getElementById('montoTotalFinal').value) || 0;
        const pagoParcial = parseFloat(document.getElementById('pagoParcial').value) || 0;
        const restaPagarInput = document.getElementById('restaPagar');
        const tipoDePagoSelect = document.getElementById('tipoDePago');
        const montoPagadoInput = document.getElementById('montoPagado');

        let restaPagar = montoTotalFinal - pagoParcial;
        restaPagarInput.value = restaPagar.toFixed(2);

        // Actualiza el campo "Monto Pagado" que se envía a la hoja
        if (tipoDePagoSelect.value === 'PARCIAL') {
            montoPagadoInput.value = pagoParcial.toFixed(2);
        } else if (tipoDePagoSelect.value === 'TOTAL') {
            montoPagadoInput.value = montoTotalFinal.toFixed(2);
        } else {
            montoPagadoInput.value = '';
        }
    }
    // Llama a togglePaymentFields al inicio para establecer el estado inicial
    togglePaymentFields();
    // --- Fin de la lógica de manejo de campos de pago ---


    // Handle form submission
    document.getElementById('reservaForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const form = event.target;
        const payload = {}; // Cambiamos 'data' a 'payload' para claridad

        // Collect main form fields based on their 'name' attribute
        const formElements = form.elements;
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name && !['button', 'submit', 'reset'].includes(element.type)) {
                payload[element.name] = element.value;
            }
        }

        // Manually collect dynamic pax fields, ensuring correct naming for Sheets
        const numPax = parseInt(document.getElementById('cantidadPasajeros').value) || 0;
        for (let i = 1; i <= numPax; i++) {
            payload[`TABLAS_PAX${i}`] = document.getElementById(`tablasPax${i}`).value;
            payload[`BOTAS_PAX${i}`] = document.getElementById(`botasPax${i}`).value;
            payload[`ROPA_PAX${i}`] = document.getElementById(`ropaPax${i}`).value;
            payload[`CASCO_Y_ANTIPARRAS_PAX${i}`] = document.getElementById(`cascoAntiparrasPax${i}`).value;
            payload[`CLASES_PAX${i}`] = document.getElementById(`clasesPax${i}`).value;
            payload[`MONTO_ALQUILER_PAX${i}`] = parseFloat(document.getElementById(`montoAlquilerPax${i}`).value) || 0;
            payload[`MONTO_CLASE_PAX${i}`] = parseFloat(document.getElementById(`montoClasePax${i}`).value) || 0;
        }

        // Fill in empty pax fields up to PAX15 to match Sheets columns (important for consistent structure)
        for (let i = numPax + 1; i <= 15; i++) {
            payload[`TABLAS_PAX${i}`] = '';
            payload[`BOTAS_PAX${i}`] = '';
            payload[`ROPA_PAX${i}`] = '';
            payload[`CASCO_Y_ANTIPARRAS_PAX${i}`] = '';
            payload[`CLASES_PAX${i}`] = '';
            payload[`MONTO_ALQUILER_PAX${i}`] = 0;
            payload[`MONTO_CLASE_PAX${i}`] = 0;
        }

        // Ensure numeric values are sent as numbers, not strings
        payload['DIAS'] = parseInt(payload['DIAS']) || 0;
        payload['CANTIDAD_PASAJEROS'] = parseInt(payload['CANTIDAD_PASAJEROS']) || 0;
        payload['MONTO_TOTAL_ALQUILER'] = parseFloat(payload['MONTO_TOTAL_ALQUILER']) || 0;
        payload['MONTO_TOTAL_CLASES'] = parseFloat(payload['MONTO_TOTAL_CLASES']) || 0;
        payload['DESCUENTO'] = parseFloat(payload['DESCUENTO']) || 0;
        payload['MONTO_TOTAL_FINAL'] = parseFloat(payload['MONTO_TOTAL_FINAL']) || 0;
        
        // Revisa los nombres de estos campos en tu HTML y en la hoja
        // Si 'pagoParcial' en HTML se refiere a 'MONTO_PAGADO' en la hoja, entonces el nombre es confuso.
        // Asumiendo que 'MONTO_PAGADO' es el que realmente quieres enviar a la hoja.
        payload['PAGO_PARCIAL'] = parseFloat(payload['PAGO_PARCIAL']) || 0; // Este campo no se usa si envías MONTO_PAGADO
        payload['RESTA_PAGAR'] = parseFloat(payload['RESTA_PAGAR']) || 0;
        payload['MONTO_PAGADO'] = parseFloat(payload['MONTO_PAGADO']) || 0; // Este es el campo clave para el monto pagado

        // ELIMINAR LA COLUMNA "SITUACION" ANTES DE ENVIAR (se manejará en el backend)
        delete payload['SITUACION']; 

        // AÑADIR EL CAMPO "ESTADO" (si existe en tu HTML, si no lo manejas en Apps Script)
        // Por lo general, 'ESTADO' como "Cobrado" o "No Cobrado" se deduce de 'MONTO_PAGADO' en Apps Script.
        // Si tienes un input oculto llamado 'estado', su valor se recolectaría automáticamente.
        // Si no, no es necesario añadirlo aquí a menos que tengas un campo específico para ello.
        // const estadoInput = document.getElementById('estado');
        // if (estadoInput) {
        //     payload['ESTADO'] = estadoInput.value;
        // }
        // Si 'ESTADO' se refiere a si está "Cobrado" o "No Cobrado", lo calculas en Apps Script.
        // Si es otro tipo de estado (e.g., "Confirmada", "Pendiente"), asegúrate de que el campo exista en tu HTML.


        // --- PREPARAR EL OBJETO DATA PARA EL NUEVO doPost ---
        const dataToSend = {
            action: 'addPreReserva', // <--- Especificamos la acción
            payload: payload         // <--- El objeto con todos tus datos de formulario
        };
        // --- FIN PREPARACIÓN ---

        // Send data as JSON, but with 'text/plain' Content-Type to avoid preflight
        fetch(appsScriptURL, { 
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8' // <--- CAMBIO CRUCIAL AQUÍ
            },
            body: JSON.stringify(dataToSend) // <--- Enviamos el objeto dataToSend
        })
        .then(response => response.json()) // <--- Esperamos JSON de vuelta
        .then(result => {
            if (result.success) { // <--- Cambiamos la condición de éxito
                alert('¡Reserva enviada exitosamente! ID: ' + result.id); // Mostrar el ID devuelto por Apps Script
                form.reset(); 
                document.getElementById('paxFieldsContainer').innerHTML = ''; 
                document.getElementById('idPreReserva').value = '0' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // Regenerar un nuevo ID de pre-reserva para el siguiente
                document.getElementById('fechaHoy').value = today;
                document.getElementById('cantidadPasajeros').dispatchEvent(new Event('input')); // Re-generar 1 pax
                togglePaymentFields(); // Resetear campos de pago
            } else {
                alert('Hubo un error al enviar el formulario: ' + result.message); // <--- Mensaje de error del backend
                console.error('Error del backend:', result.message);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch (posiblemente CORS):', error);
            alert('Hubo un error de conexión o de red. Por favor, intente de nuevo. Detalles: ' + error.message); // <--- Mensaje de error de red
        });
    });

    // Clear form functionality
    document.getElementById('clearForm').addEventListener('click', function() {
        document.getElementById('reservaForm').reset();
        document.getElementById('paxFieldsContainer').innerHTML = ''; // Limpiar campos de pasajeros
        document.getElementById('idPreReserva').value = '0' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // Nuevo ID
        document.getElementById('fechaHoy').value = today;
        document.getElementById('cantidadPasajeros').dispatchEvent(new Event('input')); // Re-generar 1 pax
        togglePaymentFields(); // Resetear campos de pago
    });
});