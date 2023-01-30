<template>
  <Header title='E-commerce template' />
  <main>
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
main {
  min-height: calc(100vh - 142px);
}
</style>
