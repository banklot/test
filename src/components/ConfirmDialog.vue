<template>
  <Dialog header="Confirmar"
          :style="{width: '450px'}"
          v-model:visible="computedVisible"
          :modal="true"
          :closable="true">

    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <td v-html="message"></td>
    </div>
    <template #footer>
      <div  class="footer">
        <Button label="No" @click="rejectAction" class="p-button-text" autofocus/>
        <Button label="Si" icon="pi pi-times" @click="acceptAction" class="p-button-text p-button-danger"  />
      </div>
    </template>
  </Dialog>
</template>

<script>
export default {
  name: "DialogConfirm",
  props: {
    show: Boolean,
    message: String,
  },
  methods: {
    acceptAction() {
      this.$emit('confirm-action')
      this.$emit('close')
    },
    rejectAction() {
      this.$emit('close')
    }
  },
  computed: {
    computedVisible: {
      get() {
        return this.show
      },
      set() {
        this.$emit('close')
      }
    },
  }
}
</script>

<style scoped>
.confirmation-content {
  display: flex;
  justify-content: space-around;
}
.footer {
  display: flex;
  justify-content: space-between;
}
</style>