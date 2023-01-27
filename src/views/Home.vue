<template>
  <div id="Home">
    <Header :title="title" />
    <Banner />
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Banner from "@/components/Banner.vue";

export default defineComponent({
  methods: {},
  name: "Home",
  components: {
    Header,
    Banner,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
  
<style scoped lang="scss">
#Home {
  .page-title {
    font-size: 2rem;
  }
}
</style>
  