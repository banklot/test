<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
</script>

<template>
  <div class="card" id="cardoverflow">
    <div class="windowTitle">Preguntas Frecuentes</div>

    <div class="block mt-3">
      <Accordion :activeIndex="null">
        <AccordionTab header="¿Qué es GanadorApp?">
          <p>
            Es una aplicación web de apuestas diseñada para funcionar a través
            de un navegador web. A diferencia de las aplicaciones tradicionales
            que se ejecutan en un dispositivo local, las aplicaciones web se
            almacenan en un servidor y se accede a ellas a través de Internet.
            En esta puedes realizar tus apuestas de lotería como triples,
            terminales y animalitos.
          </p>
        </AccordionTab>
        <AccordionTab header="¿Cómo registrarte?">
          <p>
            Puedes crear una cuenta entrando a la página principal usando tus
            cuentas de redes sociales como Google, o creando una cuenta al inicio de la sesión <b><a href="https://localhost/#/registro">"Crear Cuenta"</a></b
            >
            ingresando tus datos como cédula
            de identidad, nombre, apellido, número telefónico y correo electrónico el cual sera utilizado para hacer el registro de pago
            móvil.
          </p>
        </AccordionTab>
        <AccordionTab header="¿Cómo ingresar fondos para jugar?">
          <p>
            Desde la barra del menú, selecciona el vínculo de
            <b><a href="https://localhost/#/fondos">Ingresar Dinero</a></b
            >, utilice la opción que mas le convenga.<br />
            <b>Usando Pago Móvil</b> desde la cuenta con la que te registraste a
            la cuenta de Ganador APP  <b>"Banesco-0134"</b>.
            Una vez hayas realizado  el pago móvil, ingresa los últimos 5 números de referencia y selecciona REPORTAR PAGO. Pasados unos minutos, la transacción se
            reflejará en tu balance de fondos, con el cual podrás jugar en
            cualquiera de los juegos.<br />
            <b>Una Transferencia Bancaria:</b>Usando el
            <b>Nro. Cuenta 0134-0027-01-0271040408</b>. En este caso el importe
            se verá reflejado en tu balance de fondos 24 o 48 horas después de
            realizar tu transferencia, dependiendo de tu entidad bancaria.
          </p>
        </AccordionTab>
        <AccordionTab header="¿Cómo acceder a la página de los juegos?">
          <p>
            Una vez registrado (a) puedes ir al vinculo de
            <b><a href="https://localhost/#/">inicio</a></b
            >, y realizar la selección del juego. Ya estarás listo (a) para
            empezar a jugar.
          </p>
        </AccordionTab>
        <AccordionTab
          header="¿Cómo verificar los resultados de los diferentes juegos?"
        >
          <p>
            Desde la barra del menú, selecciona el vínculo de
            <b><a href="https://localhost/#/resultados">resultados</a></b
            >, aquí aparecerán los resultados de todos los juegos.
            Adicionalmente puedes seleccionar desde el menú desplegable los
            resultados de un juego en específico.
          </p>
        </AccordionTab>
        <AccordionTab header="¿Cuáles son las reglas de los diferentes juegos?">
          <p>
            Para todos los juegos debes ser mayor de 18 años. Los menores de Dieciocho (18) años no podrán adquirir tickets-recibos del juego; en consecuencia, tampoco podrán participar como jugadores, ni cobrar premios.<br />
            <b>APOSTADOR:</b> Es la persona que paga el derecho a participar  en el juego de lotería ofreciéndosele a cambio un premio en dinero y/o especie el cual ganará, solo si acierta los resultados del juego.<br />
            <b>MEDIOS DE APUESTA:</b> Son los instrumentos de juego, es decir, billetes, boletos, tickets, recibos o comprobantes de apuestas, adquiridos por el apostador, que contienen las combinaciones o elementos con los cuales el poseedor del mismo participará en el sorteo para el cual fue emitido por la Unidad de Comercialización, instalada en el Centro de Apuesta.<br />
            <b>APUESTA AUTORIZADA:</b> Es la expedida por las Unidades de Comercialización, la cual es transmitida a través de un sistema telemático, para su autorización por parte de la Operadora. Esta apuesta deberá cumplir con las normas previstas en el presente Reglamento de Juego y demás condiciones establecidas por la CONALOT y otros organismos competentes.<br />
            <b>CÓDIGO DE AUTORIZACIÓN:</b> Es una cifra alfanumérica única e irrepetible que, identifica y certifica que la apuesta pretendida por el apostador, la cual ha sido autorizada y registrada por el operador, confiriéndole valor legal a los efectos del control que deben ejercer los Organismos competentes. Siendo el único elemento que valida la Apuesta; en consecuencia, éste pasa a ser un “Código de Validación“, para estos Órganos Administrativos, este Código debe obligatoriamente: a) Estar impreso en el medio de apuesta, b) Permitir ser auditado en línea o por Internet de forma directa, a través de cualquier dispositivo desde el cual se invoque. Sólo  se RECONOCERÁN los tickets que estén debidamente autorizados. No serán responsables de tickets que no posean su Código de Validación. <br />
            <b>SORTEO:</b> Es el Acto público mediante el cual se lleva a cabo la realización del juego de lotería. <br />
            <b>TRIPLE:</b> a la modalidad de juego en la que la apuesta está asociada a una cifra que combina tres (03) dígitos, cada digito va del cero (0) al nueve (9), ambos inclusive (del 000 al 999).<br /> 
            <b>TERMINAL:</b> Es la modalidad del juego en la que la apuesta está asociada a una cifra que combina dos (02) dígitos, cada digito va del cero (0) al nueve (9), ambos inclusive (del 00 al 99).<br />
            <b>NUMEROS:</b> CERO (0) UNO (01), DOS (02), TRES (03), CUATRO (04), CINCO (05), SEIS (06), SIETE (07), OCHO (08), NUEVE (09).<br />
            <b>SIGNOS:</b> ARIES, TAURO, GÉMINIS, CÁNCER, LEO, VIRGO, LIBRA, ESCORPIO, SAGITARIO, CAPRICORNIO, ACUARIO y PISCIS. (Total 12). <br />
            Los jugadores que se consideren con derecho a <b>RECLAMO</b> deberán ponerse en contacto con nuestro departamento de Atención al Cliente, cuya información pueden encontrar en vínculo de contáctanos.<br /> 
            <b>TRIPLE CALIENTE:</b> El sorteo del juego de lotería “TRIPLE CALIENTE” será realizado en la ciudad de Caracas, capital de la República Bolivariana de Venezuela y se transmitirá a través de cualquier medio de comunicación con cobertura nacional, cuyo resultado deberá ser publicado igualmente por un diario a través de aviso de prensa con cobertura nacional. Los sorteos se efectuarán de lunes a sábados en los siguientes horarios: El primer sorteo 1:00 PM, una de la tarde con cero minutos; el segundo sorteo 4:30 PM cuatro de la tarde con Treinta minutos; el tercero 7:10 PM, siete de la noche con diez minutos ; los domingos hay un solo sorteo a las 7:10 PM siete de la noche con diez minutos.<br />
            La operadora no asume obligación alguna por <b>CONVENIOS</b> concertados por terceros, relacionados con el juego.<br />
            <b>TRIPLE ZAMORANO:</b> En cada modalidad, los aciertos sólo dan derecho al ganador a un (1) premio por jugada.  El INSTITUTO RENTA DE BENEFICENCIA PÚBLICA Y DE ASISTENCIA SOCIAL DEL ESTADO ZULIA (LOTERÍA DEL ZULIA) no asumirá obligaciones por convenios concertados con terceros por las personas que presenten al cobro ticket-recibos ganadores. En ningún caso los premios del juego TRIPLE ZAMORANO generarán intereses ni estarán sujetos a corrección monetaria ni ajustes por inflación. En caso de surgir cualquier duda o controversia el INSTITUTO RENTA DE BENEFICENCIA PÚBLICA Y DE ASISTENCIA SOCIAL DEL ESTADO ZULIA (LOTERÍA DEL ZULIA) y los apostadores, se someterán única y exclusivamente para todos los efectos, a lo que se establezca en el Reglamento del juego TRIPLE ZAMORANO que esté vigente en la fecha del sorteo respectivo y a lo que conste en el acta del sorteo correspondiente.<br />
            <b>TRIPLE ZULIA:</b> Todo ganador de un premio mayor a CINCO MIL BOLÍVARES (Bs. 5.000,00) deberá prestarse gratuitamente para la publicidad que sea requerida por la Operadora y el Comercializador a fin de promocionarlo como ganador de un premio del Juego “TRIPLE ZULIA”. El ganador acepta que hasta tanto él no haya cumplido con los requerimientos publicitarios, el pago del premio permanecerá suspendido sin perjuicio alguno para la operadora y EL INSTITUTO RENTA DE BENEFICENCIA PÚBLICA Y DE ASISTENCIA SOCIAL DEL ESTADO ZULIA “LOTERÍA DEL ZULIA.”, de lo previsto en este reglamento. En caso de surgir cualquier duda o controversia, EL INSTITUTO RENTA DE BENEFICENCIA PÚBLICA Y DE ASISTENCIA SOCIAL DEL ESTADO ZULIA “LOTERÍA DEL ZULIA.”, LA OPERADORA, los comercializadores, los Centros de Apuestas y los apostadores se someterán única y exclusivamente, para todos los efectos, a lo que se establezca en el Reglamento del Juego “TRIPLE ZULIA”, que esté vigente en la fecha del sorteo respectivo, y a lo que conste en el ACTA del sorteo correspondiente. Toda reclamación deberá formularse dentro del plazo máximo e improrrogable de cinco (5) días continuos, contados a partir del día siguiente a la fecha del sorteo respectivo. Para que se admita la reclamación, el ticket-recibo deberá cumplir con lo establecido en este reglamento. El interesado deberá consignar el ticket-recibo original objeto de reclamación y fotocopia de su cédula de identidad o pasaporte, así como llenar y firmar el formulario de reclamación correspondiente donde igualmente deberá estampar sus huellas digitales. EL INSTITUTO RENTA DE BENEFICENCIA PÚBLICA Y DE ASISTENCIA SOCIAL DEL ESTADO ZULIA “LOTERÍA DEL ZULIA” y la OPERADORA no asumirán responsabilidad alguna en caso de error en los datos registrados en el formulario de reclamación. <br />
            <b>LOTERIA CARACAS:</b> Este Juego de Lotería es denominado: “TRIPLE, TERMINAL Y PERMUTA DE LA LOTERÍA DE CARACAS “TRIPLE CARACAS”. Los sorteos del Juego de Lotería “TRIPLE, TERMINAL Y PERMUTA” “LOTERIA DE CARACAS” se efectuarán de LUNES A SABADO en los siguientes horarios: El primer sorteo 1:00 P.M. en el que se sortearán o extraerán cuatro(4) combinaciones que se identificaran como TRIPLE “A” del mediodía, TRIPLE “B” del mediodía, TRIPLE ZODIACAL CARACAS del mediodía y EXTRA RELANCINO DE TRIPLE CARACAS del mediodía; el segundo sorteo 4:30 P.M, en el que se sortearan o extraerán cuatro (4) combinaciones que se identificaran como TRIPLE “A” de la tarde, TRIPLE “B” de la tarde, TRIPLE ZODIACAL CARACAS de la tarde y EXTRA RELANCINO DE TRIPLE CARACAS de la tarde; y el tercer sorteo 7:00 P.M. en el que se sortearan o extraerán cuatro (4) combinaciones que se identificaran como TRIPLE “A” de la noche, TRIPLE “B” de la noche, TRIPLE ZODIACAL CARACAS de la noche y EXTRA RELANCINO DE TRIPLE CARACAS de la noche; Y un (1) sorteo los días DOMINGOS que se efectuará a las 7:00 P.M., en todas sus tipos. Los sorteos serán efectuados de acuerdo con los sistemas de realización legalmente permitidos, certificados y autorizados por los organismos competentes. Deberá ser presenciado por un funcionario público adscrito a la Institución Oficial de Beneficencia Pública y Asistencia Social del Distrito Capital (LOTERÍA DE CARACAS), un representante de “LA OPERADORA”, un funcionario investido con funciones notariales y un funcionario adscrito a la Comisión Nacional de Lotería. Durante la realización de cada sorteo, el resultado será válido solo cuando se posicionen y se mantengan en sus correspondientes celdas los números o signos, que permitan al Notario Público y/o los demás funcionarios autorizados, dar la lectura clara y precisa de la combinación sorteada, de la cual dará fe pública. <br />

          </p>
        </AccordionTab>
        <AccordionTab header="¿Dónde puedo verificar lo que he ganado?">
          <p>
            En la barra de menú, selecciona la opción de
            <b><a href="https://localhost/#/historial/juegos">Tickets</a></b
            >, donde se desplegará la información de la fecha, hora, monto y
            premio en caso de que lo hubiera.
          </p>
        </AccordionTab>
        <AccordionTab header="¿Dónde puedo ver el historial de mis juegos?">
          <p>
            En la barra de menú, selecciona la opción de Ticket, 
            encontrarás una pestaña de <b><a href="https://localhost/#/historial/fondos">Transacciones</a></b
            >, en donde se mostrará la información 
            de: fecha, hora, el código de la operación y el monto apostado. Puedes realizar una 
            búsqueda rápida, ingresando el código de la operación y así visualizar el ticket correspondiente. 
          </p>
        </AccordionTab>
        <AccordionTab header="¿Cómo funciona mi banca virtual?">
          <p>
            En la barra de menú, encontraras la sección <b>Billetera</b>, con dos opciones
            <b><a href="https://localhost/#/fondos">ingresar Dinero</a></b
            > y 
            <b><a href="https://localhost/#/fondos">Cobrar las Ganancias</a></b
            >.<br/><br/> <b>- Ingresar Dinero:</b> Dispondrá de toda la información necesaria para
            realizar su pago móvil, o transferencia bancaria. Recuerde ingresar
            su número de referencia. Al finalizar, dependiendo del método
            utilizado, su balance será actualizado automáticamente, o también manualmente pulsando el
            botón de refrescar, <i class="pi pi-sync"></i> ubicado en la barra superior adjunto a su
            balance. <br/><br/>
            <b>- Cobrar Ganancias</b>: Podrá visualizar visualizar información
            sobre sus fondos, con la siguiente información: <br/>
            <ul>
            
            <li>Informarse del monto ganado
            desde que se ha suscrito a la aplicación. </li><br/>
            <li>Conocer la disponibilidad
            de sus fondos y decidir si quiere usarlos para jugar, o si por el
            contrario prefiere realizar un rembolso a su cuenta.</li> <br/>
            <li>Conocer cada
            una de las transacciones que ha realizado. El movimiento de su
            dinero, fecha, tipo de movimiento y el monto.</li>
          </ul>
          </p>
        </AccordionTab>
        <AccordionTab header="¿Cómo recuperar tu contraseña?">
          <p>
            Puedes enviar un correo electrónico a
            <b><a href="mailto:info@backlot.com">info@backlot.com</a></b
            >, Introduciendo su nombre, apellido y la cuenta de correo utilizada
            en el registro de la aplicación. En unos minutos se le asignará una
            nueva contraseña, que podrá cambiar ingresando a su
            <b><a href="https://localhost/#/perfil">perfil</a></b
            >.
          </p>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#cardoverflow {
    overflow: scroll;
  }

@media (max-width: 991px) {
  #cardoverflow {
    overflow: scroll;
  }
}
</style>
