<template>
  <div id="Home">
    <Header :title="title" />
    <Banner />
    <Cards />
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Banner from "@/components/Banner.vue";
import Cards from "@/components/Cards.vue";

export default defineComponent({
  methods: {},
  name: "Home",
  components: {
    Header,
    Banner,
    Cards,
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
  