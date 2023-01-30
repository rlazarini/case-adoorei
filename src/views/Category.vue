<template>
  <Cards :category=id />
</template>

<script>
import { defineComponent } from "vue";
import Cards from "@/components/Cards.vue";

export default defineComponent({
  props: ["id"],
  name: "Category",
  components: {
    Cards,
  },
});
</script>