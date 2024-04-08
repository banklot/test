<script setup lang="ts">
import {onMounted, ref} from "vue";

import { formatTime} from "@/utils/time";
import UserService from "@/services/UserService";
import {formatCurrency} from "@/utils/general";
import PrintPage from "./TicketPrintout.vue";


const userService = new UserService();
const wagers = ref();

const total = ref(0);
const prize = ref(0);
const loading = ref(false);


const props = defineProps(['ticket'])

onMounted(async () => {
  loading.value = true;
  wagers.value = await userService.getWagers({
    "filter": {
      "ticket_uuid": props.ticket.id,
      "multiple_status": [
        "winner",
        "sold"
      ]
    },
    "sort": {
      "created_at": "desc"
    },
  });
  calculateTotal();
  loading.value = false;
});
const calculateTotal = () => {
  total.value = 0;
  prize.value = 0;
  wagers.value?.forEach((item: { amount: number; prize: number; }) => {
    total.value += item.amount;
    prize.value += item.prize;
  });
}

const printTicket=() =>
{
  // Get HTML to print from element
  const prtHtml = document.getElementById('printTicket').innerHTML;

// Get all stylesheets HTML
  let stylesHtml = '';
  for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
    stylesHtml += node.outerHTML;
  }

// Open the print window
  const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

  WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
    ${stylesHtml}
  </head>
  <body>
    ${prtHtml}
  </body>
</html>`);

  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
}

</script>

<template>
  <div id="ticket">


    <DataTable
        ref="dt"
        :value="wagers"
        dataKey="id"
        :rows="15"
        stripedRows
        scrollable
        scroll-height="400px"
        showGridlines
        responsiveLayout="scroll"
        class="p-datatable-gridlines p-datatable-striped p-datatable-sm"
        :loading="loading">

      <template #header>
        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center" v-if="props.ticket">
          <div class="flex justify-content-between">
            <div>
              <h5 class="m-0">{{ wagers?.length }} jugadas </h5>
            </div>
          </div>
        </div>
      </template>

      <template #empty> Cargando apuestas...</template>
      <Column field="product" header="Producto" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.product + " " + slotProps.data.list }}
        </template>
      </Column>
      <Column field="event_time" header="Hora" :sortable="true">
        <template #body="slotProps">
          {{ formatTime(slotProps.data.event_time) }}
        </template>
      </Column>
      <!--    <Column field="list" header="Lista" :sortable="true" style="text-align: center"/>-->
      <Column field="wager" header="Apuesta" :sortable="true" style="text-align: center">
        <template #body="slotProps">
          <div v-if="slotProps.data.prize > 0" style="font-weight: bold;">
            {{slotProps.data.wager}}
          </div>
          <div v-else>
            {{slotProps.data.wager}}
          </div>
        </template>
      </Column>

      <Column field="amount" header="Monto" :sortable="true" style="text-align: right;">
        <template #body="slotProps">
          {{ formatCurrency(parseFloat(slotProps.data.amount)) }}
        </template>
      </Column>
      <!--        <Column field="prize" header="Premio" :sortable="true" style="text-align: right;">-->
      <!--          <template #body="slotProps">-->
      <!--            {{ formatCurrency(parseFloat(slotProps.data.prize)) }}-->
      <!--          </template>-->
      <!--        </Column>-->
      <ColumnGroup type="footer">
        <Row>
          <Column footer="Total:" :colspan="3" footerStyle="text-align:right"/>
          <Column :footer="formatCurrency(Number(total.toFixed(2)))" footerStyle="text-align:right"/>
          <!--        <Column :footer="formatCurrency(Number(prize.toFixed(2)))" footerStyle="text-align:right"/>-->
        </Row>
      </ColumnGroup>
    </DataTable>
  </div>

 <PrintPage :ticket="ticket" :wagers="wagers" :total="total"/>

  <div class="printbutton flex justify-content-end">
    <Button class="mr-2" type="button" label="Imprimir" icon="pi pi-print" outlined @click="printTicket"/>
  </div>
</template>

<style scoped lang="scss">
.p-component {
  font-size: 12px !important;
}

.printbutton {
  margin-top: 10px;
}
</style>