<script setup>

import { ref } from 'vue';
</script>


<template>
  
  <div class="card pl-3 pr-3"  style="background-color:#F1F1F1">
     
     <div  class="flex align-content-evenly  flex-wrap" >
       <div class="text-xs  py-2 text-bluegray-300 font-bold pr-8">Iniciar sesion</div>
       <div class="text-xs  py-2 text-blue-700 font-bold">Crear cuenta</div>
     </div>
     <div class="formgroup-inline flex flex-wrap ">
       <div class="field" >
         <input id="userName" type="text" class= "flex text-xs w-15rem  p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" placeholder="Username">
       </div>
       <div class="flex align-content-evenly  flex-wrap gap-2">
         <input   type="text" class="flex text-xs w-10rem p-2 gap-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"  placeholder="pasword">
         <button type="button" class="flex flex-wrap align-content-between  bg-primary-700 border-primary-700 px-2 py-2 text-xs font-bold  text-blue-50 border-1 border-solid border-round cursor-pointer transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-600 active:border-primary-600">ENTRAR</button>
       </div>
     </div>
 <div class="formgroup-inline" >
     <div  class="flex align-content-between  flex-wrap py-2" >
         <input type="checkbox" id="no_sesion"  class="text-xs"/> 
         <label  class="text-xs flex align-items-center justify-content-center  text-bluegray-300 font-light">No cerrar sesión</label>
         <label  class="text-xs ml-2 flex align-items-center justify-content-center  text-bluegray-300 underline" >Recordar contraseña</label>
     </div>
 </div>
     <div class="flex  align-items-center"> <Button  class=" w-11 py-1" icon="pi pi-google" label="Continuar con Google"    outlined  rounded/></div>
   </div>
 
   <div class="col-12 flex flex-column justify-content-center p-1 ">
    <div  class="flex flex-column justify-content-center  bg-primary-700 pt-2 px-5  border-primary-700  text-xm font-bold  text-blue-50 border-1 border-solid border-round cursor-pointer transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-600 active:border-primary-600"> Jugar Triples y terminales
      </div>
      <div  class="col-12 flex flex-column justify-content-center p-1" >
        <button class="botton_gray border-round">
          <img src="./../../public/images/tripleZulia.jpeg"  width="20" height="20" alt="Imagen" class="aling-left"/>
          <span >Triple Caliente</span>
          <i class="pi pi-angle-right"></i>
      </button>
      </div>  
      <div class="col-12 flex flex-column justify-content-center  p-1" >
        <button class="botton_gray border-round ">
          <img src="./../../public/images/tripleZulia.jpeg"  width="20" height="20" alt="Imagen"/>
          <span >Triple Zulia</span>
          <i class="pi pi-angle-right"></i>
      </button>
      </div>
      <div  class="col-12 flex flex-column justify-content-center  p-1" >
        <button class="botton_gray border-round">
          <img src="./../../public/images/tripleZulia.jpeg"  width="20" height="20" alt="Imagen" class="aling-left"/>
          <span >Triple Zamorano</span>
          <i class="pi pi-angle-right"></i>
      </button>
      </div>
      <div  class="col-12 flex flex-column justify-content-center  p-1" >
        <button class="botton_gray border-round">
          <img src="./../../public/images/tripleZulia.jpeg"  width="20" height="20" alt="Imagen"/>
          <span >Triple Caracas</span>
          <i class="pi pi-angle-right"></i>
      </button>
      </div>   
   
      <div  class="col-12 flex flex-column justify-content-center  p-1" >
        <button class="botton_gray border-round">
          <img src="./../../public/images/tripleZulia.jpeg"  width="20" height="20" alt="Imagen" class="aling-left"/>
          <span >Triple Tachira</span>
          <i class="pi pi-angle-right"></i>
      </button>
      </div>  
       <div  class="flex flex-column justify-content-center p-1 bg-primary-700 pt-2 px-7  border-primary-700  text-xm font-bold  text-blue-50 border-1 border-solid border-round cursor-pointer transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-600 active:border-primary-600"> Jugar Animalitos
      </div>
</div>

<div>
  <div class="grid flex  align-items-center m-1" style="background-color:#F1F1F1" >
    <div class="col">
        <div class="text-center  p-2  "><img src="./../../public/images/tripleZulia.jpeg" width="30" height="30"/></div>
    </div>
    <div class="col">
      <div class="text-center  p-2 "><img src="./../../public/images/tripleZulia.jpeg" width="30" height="30"/></div>
    </div>
    <div class="col">
      <div class="text-center  p-2  "><img src="./../../public/images/tripleZulia.jpeg" width="30" height="30"/></div>
    </div>
</div>
</div>
</template>


<style scoped>
 .botton_gray{
  color: rgb(161, 159, 164);
  background: rgb(219, 219, 219);
  border: 0.5px  rgb(109, 107, 107);
  font-size: 0.7rem;
  box-shadow: 0 0 0 0.3rem rgba(160, 162, 163, 0.5); 
  outline: 0 none;
  outline-offset: 0;
  }

</style>  