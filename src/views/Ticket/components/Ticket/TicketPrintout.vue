<script setup lang="ts">

import {formatCurrency} from "@/utils/general";
import {convertUTCtoVzla, formatDate, formatTime} from "@/utils/time";
import Logo from "@/layout/composables/Logo.vue";

const props = defineProps(['ticket', 'wagers', 'total'])


</script>

<template>
  <div id="printTicket">
    <div style="width: 100%;">
      <Logo style="width: 350px; height: 70px"/>
      <div class="flex justify-content-between">
        <div>
          <div class="flex-column">
            <div class="d-time">
              FECHA: {{ formatDate(props.ticket.sale_time) }} | {{ convertUTCtoVzla(props.ticket.sale_time) }}
            </div>
            <div class="ticket-id">{{ props.ticket.id }}</div>
          </div>
        </div>
        <div class="message">¡BUENA SUERTE!</div>
      </div>
    </div>
    <div style="border: 1px solid black;margin-top: 10px;"></div>
    <br>

    <DataTable
        ref="dt"
        :value="props.wagers"
        dataKey="id"
        stripedRows
        showGridlines
        class="p-datatable-gridlines p-datatable-striped p-datatable-sm">
      <template #header>
        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center" v-if="props.ticket">
          <div class="flex justify-content-between">
            <div>
              <h5 class="m-0">{{ props.wagers?.length }} jugadas </h5>
            </div>
            <hr>
          </div>
        </div>
      </template>

      <template #empty> Cargando apuestas...</template>
      <Column field="product" header="Producto">
        <template #body="slotProps">
          {{ slotProps.data.product + " " + slotProps.data.list }}
        </template>
      </Column>
      <Column field="event_time" header="Hora">
        <template #body="slotProps">
          {{ formatTime(slotProps.data.event_time) }}
        </template>
      </Column>
      <Column field="wager" header="Apuesta" style="text-align: center">
        <template #body="slotProps">
          <div v-if="slotProps.data.prize > 0" style="font-weight: bold;">
            {{ formatCurrency(parseFloat(slotProps.data.wager)) }}
          </div>
          <div v-else>
            {{ formatCurrency(parseFloat(slotProps.data.wager)) }}
          </div>
        </template>
      </Column>

      <Column field="amount" header="Monto" style="text-align: right;">
        <template #body="slotProps">
          {{ formatCurrency(parseFloat(slotProps.data.amount)) }}
        </template>
      </Column>
      <ColumnGroup type="footer">
        <Row>
          <Column footer="Total:" :colspan="3" footerStyle="text-align:right"/>
          <Column :footer="formatCurrency(Number(props.total.toFixed(2)))" footerStyle="text-align:right"/>
          <!--        <Column :footer="formatCurrency(Number(prize.toFixed(2)))" footerStyle="text-align:right"/>-->
        </Row>
      </ColumnGroup>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
#printTicket {
  display: none;
  margin: 20px;
}
</style>