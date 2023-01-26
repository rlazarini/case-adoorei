<template>
  <Home title='E-commerce template' />
</template>

<script>
import { defineComponent } from "vue";
import Home from "./views/Home.vue";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
});
</script>

<style lang="scss">
</style>
