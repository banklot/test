<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from "vue";
import AppTopbar from "./AppTopbar.vue";
import AppFooter from "./AppFooter.vue";
import AppSidebar from "./AppSidebar.vue";
import SidebarRight from "./AppSidebarRight.vue";
import { useLayout } from "@/layout/composables/layout";

const {
  layoutConfig,
  layoutState,
  isSidebarActive,
  isCartActive,
  onCartToggle,
} = useLayout();

const outsideClickListener = ref(null);

const debounce = (fn, wait) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    const context = this; // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args); // call the function if time expires
    }, wait);
  };
};

const handleResize = debounce(() => {
  if (window.innerWidth > 991) {
    layoutState.staticCartDesktopActive.value = true;
    layoutState.staticMenuDesktopActive.value = true;
    layoutState.staticCartMobileActive.value = false;
    layoutState.staticMenuMobileActive.value = false;
  } else {
    layoutState.staticCartDesktopActive.value = false;
    layoutState.staticMenuDesktopActive.value = false;
    layoutState.staticCartMobileActive.value = false;
    layoutState.staticMenuMobileActive.value = false;
  }
}, 20);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

watch([isSidebarActive, isCartActive], (changes) => {
  const active = changes.reduce(
    (active, currActive) => active || currActive,
    false
  );
  if (active) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    "layout-theme-light": layoutConfig.darkTheme.value === "light",
    "layout-theme-dark": layoutConfig.darkTheme.value === "dark",
    "layout-overlay": layoutConfig.menuMode.value === "overlay",
    "layout-static": layoutConfig.menuMode.value === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopActive.value == false &&
      layoutConfig.menuMode.value === "static",

    "layout-static-with-cart":
      layoutState.staticCartDesktopActive.value == true ||
      layoutState.staticCartMobileActive.value == true,
    "layout-static-no-cart":
      layoutState.staticCartDesktopActive.value == false &&
      layoutState.staticCartMobileActive.value == false,

    "layout-mobile-active":
      layoutState.staticMenuMobileActive.value ||
      layoutState.staticCartMobileActive.value,
    "p-input-filled": layoutConfig.inputStyle.value === "filled",
    "p-ripple-disabled": !layoutConfig.ripple.value,
  };
});
const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        if (isSidebarActive) {
          layoutState.staticMenuMobileActive.value = false;
          layoutState.menuHoverActive.value = false;
        }
        if (isCartActive) {
          layoutState.staticCartMobileActive.value = false;
        }
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener.value);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  const sidebarEl = document.querySelector(".layout-sidebar");
  const cartEl = document.querySelector(".layout-cart");
  const topbarEl = document.querySelector(".layout-menu-button");
  const userMenuEl = document.querySelector(".layout-topbar-menu");

  // debugger;
  const sidebarClicked =
    sidebarEl &&
    (sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target));
  const cartClicked =
    cartEl &&
    (cartEl.isSameNode(event.target) || cartEl.contains(event.target));
  const topClicked =
    topbarEl &&
    (topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
  const userMenuClicked =
    userMenuEl &&
    (userMenuEl.isSameNode(event.target) || userMenuEl.contains(event.target));

  // debugger;
  return !(sidebarClicked || cartClicked || topClicked || userMenuClicked);
};
</script>

<template>
  <!-- <div class="layout-wrapper bg" :class="containerClass">  Revisar si container class se va a usar-->
    <div class="layout-wrapper bg"> 

    <div class="topbar">
      <AppTopbar></AppTopbar>
    </div>
  
    <div class="layout-main-cont flex justify-content-center mt-2 p-5">
      <div class="card mt-7 mr-3 w-2">
        Left
      </div>
      <div class="page mt-7 w-4">
        <RouterView></RouterView>
        Center
      </div>
      <div class="card mt-7 ml-3 w-2 p-0">
        <SidebarRight></SidebarRight>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
