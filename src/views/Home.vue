<template>
  <div id="Home">
    <Header :title="title" />
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  methods: {},
  name: "Home",
  components: {
    Header,
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
  