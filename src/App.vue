<template>
  <HeaderPanel />
  <RouterView v-slot="{ Component, route }">
    <transition name="slide">
      <component :is="Component" :key="route.path" />
    </transition>
  </RouterView>
</template>

<script>
import { RouterView } from "vue-router";
import HeaderPanel from "./components/ui/HeaderPanel.vue";
export default {
  components: { HeaderPanel, RouterView },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  position: absolute;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
/* header { */
/*   line-height: 1.5; */
/*   max-height: 100vh; */
/* } */

/* .logo { */
/*   display: block; */
/*   margin: 0 auto 2rem; */
/* } */

/* nav { */
/*   width: 100%; */
/*   font-size: 12px; */
/*   text-align: center; */
/*   margin-top: 2rem; */
/* } */

/* nav a.router-link-exact-active { */
/*   color: var(--color-text); */
/* } */

/* nav a.router-link-exact-active:hover { */
/*   background-color: transparent; */
/* } */

/* nav a { */
/*   display: inline-block; */
/*   padding: 0 1rem; */
/*   border-left: 1px solid var(--color-border); */
/* } */

/* nav a:first-of-type { */
/*   border: 0; */
/* } */

/* @media (min-width: 1024px) { */
/*   header { */
/*     display: flex; */
/*     place-items: center; */
/*     padding-right: calc(var(--section-gap) / 2); */
/*   } */

/*   .logo { */
/*     margin: 0 2rem 0 0; */
/*   } */

/*   header .wrapper { */
/*     display: flex; */
/*     place-items: flex-start; */
/*     flex-wrap: wrap; */
/*   } */

/*   nav { */
/*     text-align: left; */
/*     margin-left: -1rem; */
/*     font-size: 1rem; */

/*     padding: 1rem 0; */
/*     margin-top: 1rem; */
/*   } */
/* } */
</style>
