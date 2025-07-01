document.addEventListener('DOMContentLoaded', function() {
    // ESTA ES LA URL DE TU GOOGLE APPS SCRIPT
    // ¡REEMPLAZA "TU_URL_DE_APPS_SCRIPT_AQUI" CON LA URL REAL DE TU DEPLOYMENT!
    const appsScriptURL = "https://script.google.com/macros/s/AKfycby8f5i2oWlSn_ioH3Yf1aEuWARW6TVieIl4-WW8OIAyATfEmTAYjtKQWzsfd012QjiB/exec";

    // Referencia al spinner de carga
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Set today's date
    const today = new Date().toISOString().slice(0, 10);
    document.getElementById('fechaHoy').value = today;

   

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
        let numPax = parseInt(this.value) || 0;

          if (numPax > 15) {
            numPax = 15;
            this.value = 15; // Actualiza el valor mostrado en el input
            alert('El número máximo de pasajeros es 15.'); // Opcional: alerta al usuario
        }
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
                            <option value="PRE-SKI">PRE - SKI</option>
                            <option value="PANT-GUAN">PANT - GUAN</option>
                            <option value="PANT-GUAN-PRESKI">PANT - GUAN - PRE SKI</option>
                            <option value="PANT-PRESKI">PANT - PRE SKI</option>
                            <option value="CAMP-GUANTES">CAMP - GUANTES</option>
                            <option value="CAMP-GUANTES-PRESKI">CAMP - GUANTES - PRE SKI</option>
                            <option value="CAMP-PRESKI">CAMP - PRE SKI</option>
                            <option value="CAMP-GUANT-PANT">CAMP-GUANTE-PANTALON</option>
                            <option value="PANT-CAMP">PANT - CAMP</option>
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
                            <input type="number" class="form-control monto-alquiler-pax" id="montoAlquilerPax${i}" name="MONTO_ALQUILER_PAX${i}" step="0.01">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="montoClasePax${i}">Monto Clase PAX ${i}</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type="number" class="form-control monto-clase-pax" id="montoClasePax${i}" name="MONTO_CLASE_PAX${i}" step="0.01">
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

    // --- Nuevas funciones para sumar montos de pasajeros ---
    function addPaxAmountListeners() {
        const montoAlquilerPaxInputs = document.querySelectorAll('.monto-alquiler-pax');
        montoAlquilerPaxInputs.forEach(input => {
            input.removeEventListener('input', calculateTotalAlquilerFromPax); // Previene duplicados
            input.addEventListener('input', calculateTotalAlquilerFromPax);
        });

        const montoClasePaxInputs = document.querySelectorAll('.monto-clase-pax');
        montoClasePaxInputs.forEach(input => {
            input.removeEventListener('input', calculateTotalClasesFromPax); // Previene duplicados
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

        calculatePaymentAmounts(); // Recalcular los montos de pago basados en el nuevo total final
    }

    // Escuchar cambios en los campos relevantes para actualizar Monto Total Final
    document.getElementById('montoTotalAlquiler').addEventListener('input', calculateMontoTotalFinal);
    document.getElementById('montoTotalClases').addEventListener('input', calculateMontoTotalFinal);
    document.getElementById('descuento').addEventListener('input', calculateMontoTotalFinal);
    // --- Fin de la lógica de cálculo automático de Monto Total Final ---


    // --- Lógica de manejo de campos de pago (SI_PAGO_TOTAL, TIPO_DE_PAGO, MONTO_PAGADO) ---
    window.togglePaymentFields = function() {
        const siPagoTotal = document.getElementById('siPagoTotal').value;
        const metodoPagoGroup = document.getElementById('metodoPagoGroup');
        const pagoParcialGroup = document.getElementById('pagoParcialGroup');
        const restaPagarGroup = document.getElementById('restaPagarGroup');
        const pagoParcialInput = document.getElementById('pagoParcial');
        const tipoDePagoSelect = document.getElementById('tipoDePago');

        if (siPagoTotal === 'SI') {
            metodoPagoGroup.style.display = 'block';
            pagoParcialGroup.style.display = 'none';
            restaPagarGroup.style.display = 'none';
            pagoParcialInput.disabled = true; // Deshabilita el campo de pago parcial
            tipoDePagoSelect.value = 'TOTAL';
        } else if (siPagoTotal === 'NO') {
            metodoPagoGroup.style.display = 'block';
            pagoParcialGroup.style.display = 'block';
            restaPagarGroup.style.display = 'block';
            pagoParcialInput.disabled = false; // Habilita el campo de pago parcial
            tipoDePagoSelect.value = 'PARCIAL';
        } else {
            metodoPagoGroup.style.display = 'none';
            pagoParcialGroup.style.display = 'none';
            restaPagarGroup.style.display = 'none';
            pagoParcialInput.disabled = true;
            pagoParcialInput.value = '';
            tipoDePagoSelect.value = '';
        }
        calculatePaymentAmounts(); // Llama a la función principal de cálculo de pago
    };

    function calculatePaymentAmounts() {
        const montoTotalFinal = parseFloat(document.getElementById('montoTotalFinal').value) || 0;
        const siPagoTotal = document.getElementById('siPagoTotal').value;
        const pagoParcialInput = document.getElementById('pagoParcial');
        const restaPagarInput = document.getElementById('restaPagar');
        const montoPagadoInput = document.getElementById('montoPagado');
        const tipoDePagoSelect = document.getElementById('tipoDePago');

        let montoPagado = 0;
        let restaPagar = montoTotalFinal;

        if (siPagoTotal === 'SI') {
            montoPagado = montoTotalFinal;
            restaPagar = 0;
            pagoParcialInput.value = montoTotalFinal.toFixed(2); // Asegura que el campo de pago parcial muestre el total
            tipoDePagoSelect.value = 'TOTAL'; // Asegura que el select de tipo de pago sea TOTAL
        } else if (siPagoTotal === 'NO') {
            const pagoParcial = parseFloat(pagoParcialInput.value) || 0;
            montoPagado = pagoParcial;
            restaPagar = montoTotalFinal - pagoParcial;
            tipoDePagoSelect.value = 'PARCIAL'; // Asegura que el select de tipo de pago sea PARCIAL
        } else {
            montoPagado = 0;
            restaPagar = montoTotalFinal;
            pagoParcialInput.value = '';
            tipoDePagoSelect.value = '';
        }

        montoPagadoInput.value = montoPagado.toFixed(2);
        restaPagarInput.value = restaPagar.toFixed(2);
    }

    // Inicializar los campos de pago al cargar la página y escuchar cambios
    document.getElementById('siPagoTotal').addEventListener('change', window.togglePaymentFields);
    document.getElementById('pagoParcial').addEventListener('input', calculatePaymentAmounts);
    // El tipoDePago no debería cambiar manualmente si se deriva de siPagoTotal, pero si lo permites:
    // document.getElementById('tipoDePago').addEventListener('change', calculatePaymentAmounts);

    // Disparar la generación inicial de pasajeros y la inicialización de los campos de pago
    document.getElementById('cantidadPasajeros').dispatchEvent(new Event('input'));
    window.togglePaymentFields();


    // Handle form submission
    document.getElementById('reservaForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // MOSTRAR SPINNER AL INICIO DEL ENVÍO
        loadingSpinner.style.display = 'flex';

        const form = event.target;
        const payload = {};

        // Obtener la hora actual de carga
        const now = new Date();
        const horaCarga = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        payload['hora_de_carga'] = horaCarga; // Asigna al campo 'hora_de_carga'

        // Obtener el valor del checkbox de flexibilidad
        const flexibilidadCheckbox = document.getElementById('flexibilidadCheckbox');
        payload['Flexibilidad'] = flexibilidadCheckbox.checked ? 'Si' : 'No'; // Asigna al campo 'Flexibilidad'

        // Collect main form fields based on their 'name' attribute
        const formElements = form.elements;
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name && !['button', 'submit', 'reset', 'FLEXIBILIDAD_CHECK','ID_PRE_RESERVA'].includes(element.type)) { // Excluir el checkbox de flexibilidad
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

        // Fill in empty pax fields up to PAX15 to match Sheets columns (if needed)
        // This ensures consistent data structure for the backend if columns are fixed.
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
        payload['PAGO_PARCIAL'] = parseFloat(payload['PAGO_PARCIAL']) || 0;
        payload['RESTA_PAGAR'] = parseFloat(payload['RESTA_PAGAR']) || 0;
        payload['MONTO_PAGADO'] = parseFloat(payload['MONTO_PAGADO']) || 0;

        // ELIMINAR LA COLUMNA "SITUACION" ANTES DE ENVIAR (se manejará en el backend)
        delete payload['SITUACION'];

        // AÑADIR EL CAMPO "ESTADO" (si existe en tu HTML)
        const estadoInput = document.getElementById('estado');
        if (estadoInput) {
            payload['ESTADO'] = estadoInput.value;
        }

        // Send data as JSON, using 'text/plain' to avoid CORS preflights
        fetch(appsScriptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(payload) // Enviamos el objeto payload directamente
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => {
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                });
            }
            return response.json(); // Esperamos JSON de vuelta
        })
        .then(result => {
    if (result.success) {
        // El ID de pre-reserva se generó en el backend y está en result.data
        document.getElementById('idPreReserva').value = result.data.ID_PRE_RESERVA || '-'; // ¡AQUÍ SE ASIGNA EL ID!

        // El ID de pre-reserva se generó en el backend y está en result.data
        generatePrintableTicket(result.data); // Usar result.data, que contiene el ID nuevo
           

                // Limpiar formulario y reiniciar campos
                form.reset();
                document.getElementById('paxFieldsContainer').innerHTML = '';
                document.getElementById('fechaHoy').value = today;

               
                document.getElementById('cantidadPasajeros').value = 1; // Resetear a 1 pasajero por defecto
                document.getElementById('cantidadPasajeros').dispatchEvent(new Event('input')); // Disparar para regenerar campos
                window.togglePaymentFields(); // Resetear campos de pago
                 document.getElementById('idPreReserva').value = ''; 

                // Opcional: Mostrar un mensaje de éxito más amigable en la UI
                console.log('¡Reserva enviada exitosamente y ticket generado!');
            } else {
                alert('Hubo un error al enviar el formulario: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
            alert('Hubo un error de conexión: ' + error.message);
        })
        .finally(() => {
            // OCULTAR SPINNER SIEMPRE AL FINALIZAR LA SOLICITUD (éxito o error)
            loadingSpinner.style.display = 'none';
        });
    });

        
    /**
     * Genera el HTML del ticket para impresión en una nueva ventana.
     * @param {Object} data - Los datos de la reserva para el ticket.
     */
    function generatePrintableTicket(data) {
        let paxDetailsHtml = '';
        const numPasajeros = parseInt(data.CANTIDAD_PASAJEROS || 0);

        for (let i = 1; i <= numPasajeros; i++) {
            const montoAlquilerPax = (parseFloat(data[`MONTO_ALQUILER_PAX${i}`]) || 0).toFixed(2);
            const montoClasePax = (parseFloat(data[`MONTO_CLASE_PAX${i}`]) || 0).toFixed(2);

            paxDetailsHtml += `
                <div class="pax-detail">
                    <h4>Pasajero ${i}</h4>
                    <p><strong>Tablas:</strong> ${data[`TABLAS_PAX${i}`] || '-'}</p>
                    <p><strong>Botas:</strong> ${data[`BOTAS_PAX${i}`] || '-'}</p>
                    <p><strong>Ropa:</strong> ${data[`ROPA_PAX${i}`] || '-'}</p>
                    <p><strong>Casco/Antiparras:</strong> ${data[`CASCO_Y_ANTIPARRAS_PAX${i}`] || '-'}</p>
                    <p><strong>Clases:</strong> ${data[`CLASES_PAX${i}`] || '-'}</p>
                    <p><strong>Valor Alquiler:</strong> $${montoAlquilerPax}</p>
                    <p><strong>Valor Clases:</strong> $${montoClasePax}</p>
                </div>
            `;
        }

        const montoTotalAlquiler = parseFloat(data.MONTO_TOTAL_ALQUILER) || 0;
        const montoTotalClases = parseFloat(data.MONTO_TOTAL_CLASES) || 0;
        const descuento = parseFloat(data.DESCUENTO) || 0;
        const montoTotalFinal = parseFloat(data.MONTO_TOTAL_FINAL) || 0;
        const montoPagado = parseFloat(data.MONTO_PAGADO) || 0; 
        const restaPagar = parseFloat(data.RESTA_PAGAR) || 0;

        // Formatear la fecha para el ticket si es necesario (ej. de YYYY-MM-DD a DD/MM/YYYY)
        let formattedDate = data.FECHA || '-';
        try {
            const dateObj = new Date(data.FECHA + 'T00:00:00'); // Asegura la zona horaria para parsear
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
            }
        } catch (e) {
            console.error("Error formateando la fecha para el ticket:", e);
        }


        const singleTicketContent = `
            <div class="ticket">
                <h2>DETALLE DE RESERVA</h2>
                <div class="line"></div>
                <p class="flex-row"><span>N° Reserva:</span> <span>#${data.ID_PRE_RESERVA || '-'}</span></p>
                <p class="flex-row"><span>Fecha:</span> <span>${formattedDate}</span></p>
                <p class="flex-row"><span>Días Alquiler:</span> <span>${data.DIAS || '-'}</span></p>
                <p class="flex-row"><span>Cant. Pasajeros:</span> <span>${data.CANTIDAD_PASAJEROS || '-'}</span></p>
                <p class="flex-row"><span>Cliente:</span> <span>${data.NOMBRE_COMPLETO || '-'}</span></p>
                <p class="flex-row"><span>Contacto:</span> <span>${data.TEL_MAIL || '-'}</span></p>
                <p class="flex-row"><span>Vendedor:</span> <span>${data.VENDEDOR || '-'}</span></p>
                <p class="flex-row"><span>Estado de Pago (Pre-reserva):</span> <span>${data.ESTADO || '-'}</span></p>
                <p class="flex-row"><span>Flexibilidad:</span> <span>${data.Flexibilidad || '-'}</span></p>
                <p class="flex-row"><span>Hora de Carga:</span> <span>${data.hora_de_carga || '-'}</span></p>
                <div class="line"></div>
                <h3>Detalle por Pasajero:</h3>
                ${paxDetailsHtml}
                <div class="line"></div>
                <p class="flex-row"><span>Subtotal Alquiler:</span> <span>$${montoTotalAlquiler.toFixed(2)}</span></p>
                <p class="flex-row"><span>Subtotal Clases:</span> <span>$${montoTotalClases.toFixed(2)}</span></p>
                <p class="flex-row"><span>Descuento:</span> <span>$${descuento.toFixed(2)}</span></p>
                <p class="flex-row total-line"><span>MONTO TOTAL FINAL:</span> <span>$${montoTotalFinal.toFixed(2)}</span></p>
                <p class="flex-row"><span>Método de Pago:</span> <span>${data.METODO_DE_PAGO || '-'}</span></p>
                <p class="flex-row"><span>Tipo de Pago:</span> <span>${data.TIPO_DE_PAGO || '-'}</span></p>
                <p class="flex-row"><span>Monto Pagado:</span> <span>$${montoPagado.toFixed(2)}</span></p>
                <p class="flex-row"><span>Resta Pagar:</span> <span>$${restaPagar.toFixed(2)}</span></p>
                <div class="line"></div>
                <p><strong>Observaciones:</strong> ${data.OBSERVACIONES || '-'}</p>
                <div class="line"></div>
                <p style="text-align: center;">¡Gracias por su reserva!</p>
            </div>
        `;

        const repeatedTicketContent = singleTicketContent.repeat(1); // Repite el ticket 4 veces

        const ticketHtml = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ticket de Reserva #${data.ID_PRE_RESERVA}</title>
                <style>
                    body {
                        font-family: 'Courier New', Courier, monospace;
                        margin: 20mm; 
                        font-size: 10pt;
                    }
                    .ticket {
                        width: 80mm; /* Ancho de ticket de impresora térmica */
                        margin: 0 auto 15mm auto; /* Margen inferior para separar tickets */
                        border: 1px dashed #ccc;
                        padding: 10px;
                        page-break-after: always; /* Para que cada ticket empiece en una nueva página al imprimir */
                    }
                    .ticket:last-child {
                        page-break-after: auto; /* El último ticket no necesita salto de página */
                    }
                    h2, h3, h4 { text-align: center; margin-bottom: 5px; }
                    p { margin: 2px 0; }
                    .line { border-top: 1px dashed #ccc; margin: 10px 0; }
                    .flex-row { display: flex; justify-content: space-between; }
                    .total-line { font-weight: bold; }
                    .pax-detail { border: 1px solid #eee; padding: 8px; margin-bottom: 10px; background-color: #f9f9f9; }
                    .pax-detail h4 { text-align: left; margin-bottom: 5px; color: #333; }
                    @media print {
                        .no-print { display: none; }
                        body { margin: 0; } 
                        .ticket { border: none; padding: 0; width: auto; }
                    }
                </style>
            </head>
            <body>
                ${repeatedTicketContent} 
                <script>
                    window.onload = () => {
                        setTimeout(() => {
                            window.print();
                            // Opcional: Cierra la ventana después de imprimir o si el usuario cancela
                            // window.close(); 
                        }, 500); // Pequeño retraso para asegurar que el contenido se cargó
                    };
                </script>
            </body>
            </html>
        `;

        try {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(ticketHtml);
                printWindow.document.close();
            } else {
                // Mejorar el mensaje de error para el usuario
                alert('No se pudo abrir la ventana de impresión. Por favor, deshabilite los bloqueadores de pop-ups para este sitio.');
                console.error('El navegador bloqueó la ventana de impresión o falló al abrirla.');
            }
        } catch (error) {
            console.error('Error al generar el ticket de impresión:', error);
            alert('Hubo un error al generar el ticket. Consulte la consola del navegador para más detalles.');
        }
    }

    // Clear form functionality
    document.getElementById('clearForm').addEventListener('click', function() {
        document.getElementById('reservaForm').reset();
        document.getElementById('paxFieldsContainer').innerHTML = '';
        document.getElementById('fechaHoy').value = today;
        document.getElementById('cantidadPasajeros').value = 1; // Asegurarse de resetear a 1 pasajero
        document.getElementById('cantidadPasajeros').dispatchEvent(new Event('input')); // Disparar para regenerar
        window.togglePaymentFields(); // Resetear los campos de pago
         document.getElementById('idPreReserva').value = ''; 
    });
});


