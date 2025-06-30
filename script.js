document.addEventListener('DOMContentLoaded', function() {
    // Es crucial que esta URL sea la de tu implementación de Web App (/exec)
    const appsScriptURL = "https://script.google.com/macros/s/AKfycbzrCzIoSm5-7HTQ0XlAlbH6jLr21S4NVPuPkePO0J_HQ2B-cD2kkuh4TCgFE15-MSlr/exec";
    const today = new Date().toISOString().slice(0, 10);

    // Inicialización de campos y valores
    document.getElementById('fechaHoy').value = today;
    document.getElementById('idPreReserva').value = '0' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');

    const loadingSpinner = document.getElementById('loadingSpinner');

    const vendedores = ['VAQUERO', 'TURBO', 'LUISA', 'DUDU', 'CHELO', 'LUCAS', 'FISU', 'NICO', 'NUESTRO', 'LUCHO'];
    const vendedorSelect = document.getElementById('vendedor');
    vendedores.forEach(vendedor => {
        const option = document.createElement('option');
        option.value = vendedor;
        option.textContent = vendedor;
        vendedorSelect.appendChild(option);
    });

    document.getElementById('cantidadPasajeros').addEventListener('input', function() {
        const numPax = parseInt(this.value) || 0;
        const paxFieldsContainer = document.getElementById('paxFieldsContainer');
        paxFieldsContainer.innerHTML = '';

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
                            <option value="PRE-SKI">PRE-SKI</option>
                            <option value="PANT-GUAN">PANT-GUAN</option>
                            <option value="PANT-GUAN-PRESKI">PANT-GUAN-PRESKI</option>
                            <option value="PANT-PRESKI">PANT-PRESKI</option>
                            <option value="CAMP-GUANTES">CAMP-GUANTES</option>
                            <option value="CAMP-GUANTES-PRESKI">CAMP-GUANTES-PRESKI</option>
                            <option value="CAMP-PRESKI">CAMP-PRESKI</option>
                            <option value="PANT-CAMP">PANT-CAMP</option>
                            <option value="CAMP-GUANT-PANT">CAMP-GUANT-PANT</option>
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

        addPaxAmountListeners();
        calculateTotalAlquilerFromPax();
        calculateTotalClasesFromPax();
    });

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
        calculateMontoTotalFinal();
    }

    function calculateTotalClasesFromPax() {
        let totalClases = 0;
        const montoClasePaxInputs = document.querySelectorAll('.monto-clase-pax');
        montoClasePaxInputs.forEach(input => {
            totalClases += parseFloat(input.value) || 0;
        });
        document.getElementById('montoTotalClases').value = totalClases.toFixed(2);
        calculateMontoTotalFinal();
    }

    function calculateMontoTotalFinal() {
        const montoAlquiler = parseFloat(document.getElementById('montoTotalAlquiler').value) || 0;
        const montoClases = parseFloat(document.getElementById('montoTotalClases').value) || 0;
        const descuento = parseFloat(document.getElementById('descuento').value) || 0;
        const montoTotalFinalInput = document.getElementById('montoTotalFinal');

        let total = montoAlquiler + montoClases - descuento;
        montoTotalFinalInput.value = total.toFixed(2);

        calculateRestaPagar();
    }

    document.getElementById('montoTotalAlquiler').addEventListener('input', calculateMontoTotalFinal);
    document.getElementById('montoTotalClases').addEventListener('input', calculateMontoTotalFinal);
    document.getElementById('descuento').addEventListener('input', calculateMontoTotalFinal);

    window.togglePaymentFields = function() {
        const siPagoTotal = document.getElementById('siPagoTotal').value;
        const metodoPagoGroup = document.getElementById('metodoPagoGroup');
        const pagoParcialGroup = document.getElementById('pagoParcialGroup');
        const restaPagarGroup = document.getElementById('restaPagarGroup');
        const montoTotalFinal = parseFloat(document.getElementById('montoTotalFinal').value) || 0;
        const pagoParcialInput = document.getElementById('pagoParcial');
        const restaPagarInput = document.getElementById('restaPagar');
        const tipoDePagoSelect = document.getElementById('tipoDePago');
        const montoPagadoInput = document.getElementById('montoPagado');

        if (siPagoTotal === 'SI') {
            metodoPagoGroup.style.display = 'block';
            pagoParcialGroup.style.display = 'none';
            restaPagarGroup.style.display = 'none';
            pagoParcialInput.value = montoTotalFinal.toFixed(2);
            restaPagarInput.value = (0).toFixed(2);
            tipoDePagoSelect.value = 'TOTAL';
            montoPagadoInput.value = montoTotalFinal.toFixed(2);
        } else if (siPagoTotal === 'NO') {
            metodoPagoGroup.style.display = 'block';
            pagoParcialGroup.style.display = 'block';
            restaPagarGroup.style.display = 'block';
            pagoParcialInput.value = '';
            restaPagarInput.value = '';
            tipoDePagoSelect.value = 'PARCIAL';
            montoPagadoInput.value = '';
        } else {
            metodoPagoGroup.style.display = 'none';
            pagoParcialGroup.style.display = 'none';
            restaPagarGroup.style.display = 'none';
            pagoParcialInput.value = '';
            restaPagarInput.value = '';
            tipoDePagoSelect.value = '';
            montoPagadoInput.value = '';
        }
        calculateRestaPagar();
    };

    document.getElementById('pagoParcial').addEventListener('input', calculateRestaPagar);

    function calculateRestaPagar() {
        const montoTotalFinal = parseFloat(document.getElementById('montoTotalFinal').value) || 0;
        const pagoParcial = parseFloat(document.getElementById('pagoParcial').value) || 0;
        const restaPagarInput = document.getElementById('restaPagar');
        const tipoDePagoSelect = document.getElementById('tipoDePago');
        const montoPagadoInput = document.getElementById('montoPagado');

        let restaPagar = montoTotalFinal - pagoParcial;
        restaPagarInput.value = restaPagar.toFixed(2);

        if (tipoDePagoSelect.value === 'PARCIAL') {
            montoPagadoInput.value = pagoParcial.toFixed(2);
        } else if (tipoDePagoSelect.value === 'TOTAL') {
            montoPagadoInput.value = montoTotalFinal.toFixed(2);
        } else {
            montoPagadoInput.value = '';
        }
    }

    document.getElementById('siPagoTotal').addEventListener('change', window.togglePaymentFields);
    document.getElementById('tipoDePago').addEventListener('change', calculateRestaPagar);

    // Disparar eventos iniciales para poblar campos y calcular totales
    document.getElementById('cantidadPasajeros').dispatchEvent(new Event('input'));
    window.togglePaymentFields();

    // Función para generar el HTML del ticket
    function generateTicketHtml(data) {
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

        return `
            <div class="ticket" style="font-family: Arial, sans-serif; max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; color: #333;">DETALLE DE RESERVA</h2>
                <div style="border-top: 1px dashed #ccc; margin: 10px 0;"></div>
                <p style="display: flex; justify-content: space-between;"><span>N° Reserva:</span> <span>#${data.ID_PRE_RESERVA || '-'}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Fecha:</span> <span>${data.FECHA || '-'}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Días Alquiler:</span> <span>${data.DIAS || '-'}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Cant. Pasajeros:</span> <span>${data.CANTIDAD_PASAJEROS || '-'}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Cliente:</span> <span>${data.NOMBRE_COMPLETO || '-'}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Contacto:</span> <span>${data.TEL_MAIL || '-'}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Vendedor:</span> <span>${data.VENDEDOR || '-'}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Estado de Pago:</span> <span>${data.ESTADO || '-'}</span></p>
                <div style="border-top: 1px dashed #ccc; margin: 10px 0;"></div>
                <h3>Detalle por Pasajero:</h3>
                ${paxDetailsHtml}
                <div style="border-top: 1px dashed #ccc; margin: 10px 0;"></div>
                <p style="display: flex; justify-content: space-between;"><span>Subtotal Alquiler:</span> <span>$${montoTotalAlquiler.toFixed(2)}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Subtotal Clases:</span> <span>$${montoTotalClases.toFixed(2)}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Descuento:</span> <span>$${descuento.toFixed(2)}</span></p>
                <p style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1em;"><span>MONTO TOTAL FINAL:</span> <span>$${montoTotalFinal.toFixed(2)}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Método de Pago:</span> <span>${data.METODO_DE_PAGO || '-'}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Tipo de Pago:</span> <span>${data.TIPO_DE_PAGO || '-'}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Monto Pagado:</span> <span>$${montoPagado.toFixed(2)}</span></p>
                <p style="display: flex; justify-content: space-between;"><span>Resta Pagar:</span> <span>$${restaPagar.toFixed(2)}</span></p>
                <div style="border-top: 1px dashed #ccc; margin: 10px 0;"></div>
                <p><strong>Observaciones:</strong> ${data.OBSERVACIONES || '-'}</p>
                <div style="border-top: 1px dashed #ccc; margin: 10px 0;"></div>
                <p style="text-align: center; font-style: italic;">¡Gracias por su reserva!</p>
            </div>
        `;
    }


    document.getElementById('reservaForm').addEventListener('submit', function(event) {
        event.preventDefault();

        loadingSpinner.style.display = 'flex';

        const form = event.target;
        const payload = {};

        const formElements = form.elements;
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name && !['button', 'submit', 'reset'].includes(element.type)) {
                payload[element.name] = element.value;
            }
        }

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

        // Limpia los campos de PAX adicionales que no se usen (hasta un máximo razonable, e.g., 15)
        for (let i = numPax + 1; i <= 15; i++) {
            payload[`TABLAS_PAX${i}`] = '';
            payload[`BOTAS_PAX${i}`] = '';
            payload[`ROPA_PAX${i}`] = '';
            payload[`CASCO_Y_ANTIPARRAS_PAX${i}`] = '';
            payload[`CLASES_PAX${i}`] = '';
            payload[`MONTO_ALQUILER_PAX${i}`] = 0;
            payload[`MONTO_CLASE_PAX${i}`] = 0;
        }

        // Asegurarse de que los valores numéricos sean tratados como números
        payload['DIAS'] = parseInt(payload['DIAS']) || 0;
        payload['CANTIDAD_PASAJEROS'] = parseInt(payload['CANTIDAD_PASAJEROS']) || 0;
        payload['MONTO_TOTAL_ALQUILER'] = parseFloat(payload['MONTO_TOTAL_ALQUILER']) || 0;
        payload['MONTO_TOTAL_CLASES'] = parseFloat(payload['MONTO_TOTAL_CLASES']) || 0;
        payload['DESCUENTO'] = parseFloat(payload['DESCUENTO']) || 0;
        payload['MONTO_TOTAL_FINAL'] = parseFloat(payload['MONTO_TOTAL_FINAL']) || 0;
        payload['PAGO_PARCIAL'] = parseFloat(payload['PAGO_PARCIAL']) || 0;
        payload['RESTA_PAGAR'] = parseFloat(payload['RESTA_PAGAR']) || 0;
        payload['MONTO_PAGADO'] = parseFloat(payload['MONTO_PAGADO']) || 0;

        const estadoInput = document.getElementById('estado');
        if (estadoInput) {
            payload['ESTADO'] = estadoInput.value;
        }

        // Generar el HTML del ticket para enviarlo al backend
        const ticketHtmlContent = generateTicketHtml(payload);

        // PRIMERA LLAMADA: Guardar la reserva
        const saveReservationData = {
            action: 'addPreReserva',
            payload: payload,
            ticketHtml: ticketHtmlContent // Pasamos el HTML para reusarlo
        };

        fetch(appsScriptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // CAMBIADO: Usar application/json
            },
            body: JSON.stringify(saveReservationData)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => {
                    // Intenta parsear el error como JSON si es posible
                    try {
                        const errorJson = JSON.parse(errorText);
                        throw new Error(`HTTP error! status: ${response.status}, message: ${errorJson.message || errorText}`);
                    } catch (e) {
                        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                    }
                });
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                alert('¡Reserva enviada exitosamente!');
                // Restablecer el formulario
                form.reset();
                document.getElementById('paxFieldsContainer').innerHTML = '';
                document.getElementById('idPreReserva').value = '0' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
                document.getElementById('fechaHoy').value = today;
                document.getElementById('cantidadPasajeros').value = 1;
                document.getElementById('cantidadPasajeros').dispatchEvent(new Event('input'));
                window.togglePaymentFields();

                // SEGUNDA LLAMADA: Si la reserva fue exitosa y tenemos el HTML del ticket, solicitar el PDF
                if (result.ticketHtml && result.id) {
                    const generatePdfData = {
                        action: 'generatePdf',
                        htmlContent: result.ticketHtml,
                        idPreReserva: result.id
                    };
                    
                    // Crear un formulario temporal para la solicitud POST que generará el PDF
                    // Esto es necesario para que el navegador trate la respuesta como un archivo y la abra en una nueva pestaña.
                    const tempForm = document.createElement('form');
                    tempForm.action = appsScriptURL;
                    tempForm.method = 'POST';
                    tempForm.target = '_blank'; // Abrir en una nueva pestaña

                    const input = document.createElement('input');
                    input.type = 'hidden';
                    // El nombre 'data' DEBE coincidir con cómo tu Apps Script lo lee en e.parameter.data
                    input.name = 'data';
                    input.value = encodeURIComponent(JSON.stringify(generatePdfData)); // Codificar la URL para asegurar que el JSON no se corrompa
                    
                    tempForm.appendChild(input);
                    document.body.appendChild(tempForm);
                    tempForm.submit(); // Envía el formulario para abrir el PDF
                    document.body.removeChild(tempForm); // Elimina el formulario temporal
                }
            } else {
                alert('Hubo un error al enviar el formulario: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
            alert('Hubo un error de conexión: ' + error.message);
        })
        .finally(() => {
            loadingSpinner.style.display = 'none';
        });
    });

    document.getElementById('clearForm').addEventListener('click', function() {
        document.getElementById('reservaForm').reset();
        document.getElementById('paxFieldsContainer').innerHTML = '';
        document.getElementById('idPreReserva').value = '0' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        document.getElementById('fechaHoy').value = today;
        document.getElementById('cantidadPasajeros').value = 1;
        document.getElementById('cantidadPasajeros').dispatchEvent(new Event('input'));
        window.togglePaymentFields();
    });
});