<template>
  <Dialog header="¡Felicitaciones!"
          :style="{width: '450px'}"
          v-model:visible="computedVisible"
          :modal="true"
          :closable="true">
    <div class="confirmation-content">
      <i class="pi pi-thumbs-up-fill mr-3" style="font-size: 2rem" />
      <td v-html="message" style="margin-top: 5px;"></td>
    </div>
    <template #footer>
      <div  class="footer flex justify-content-end">
        <Button @click="acceptAction"  class="h-3rem w-10rem" label="Cerrar"/>
      </div>
    </template>
  </Dialog>
</template>

<script>
export default {
  name: "WelcomeDialog",
  props: {
    show: Boolean,
    message: String,
  },
  methods: {
    acceptAction() {
      // this.$emit('confirm-action')
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