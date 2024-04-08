<script setup lang="ts">
function consentWindow() {
  // TODO: Find a more elegant way to deal with this
  // window.close();
  // console.log(import.meta.env.VITE_BACKEND_URL+ '/auth/facebook')
  window.open(import.meta.env.VITE_BACKEND_URL + '/auth/facebook', 'popup', 'width=500,height=650')
}

</script>

<template>
  <div class="container">
    <a href=" #" class="social-buttons" @click="consentWindow">
      <div style="display: flex; justify-content: center;padding: 10px;">
        <div>
          <svg
              xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#3e58a4"
              class="bi bi-facebook"
              viewBox="0 0 16 16">
            <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
          </svg>
        </div>
        <div class="label font-bold">
          Ingresar con Facebook
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>

.container {
  border: solid 1px lightgray;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  background-color: white;
}

.label {
  margin-left: 10px;
  font-family: system-ui;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25rem;
  color: #54504e;
  width: 100%;
  min-width: 170px;
}
</style>
