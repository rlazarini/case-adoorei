<template>
  <div id="Home">
    <Banner />
    <Cards category="" />
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import Banner from "@/components/Banner.vue";
import Cards from "@/components/Cards.vue";

export default defineComponent({
  methods: {},
  name: "Home",
  components: {
    Banner,
    Cards,
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
  