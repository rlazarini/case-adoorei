<template>
  <Header title='E-commerce template' />
  <main class="pt-20">
    <router-view />
  </main>
  <Footer />
</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
  },
});
</script>

<style lang="scss">
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  footer {
    margin-top: auto;
  }
}
</style>
