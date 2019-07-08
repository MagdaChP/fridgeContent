<template>
  <div>
    <ul>
      <SingleItem v-for="item in filterItems" :key="item.id" :itemData="item"/>
    </ul>
  </div>
</template>

<script>
import SingleItem from "../../SingleItem/SingleItem";

export default {
  name: "SelectCategory",
  data() {
    return {
      itemCategory: ""
    };
  },
  computed: {
    filterItems() {
      let sortedCatArray = [...this.$store.state.items].filter(e => {
        return e.category === this.$route.params.category;
      });
      return sortedCatArray;
    }
  },
  watch: {
    $route(to, from) {
      console.log(
        "category:",
        (this.itemCategory = this.$route.params.category),
        "to",
        to,
        "from",
        from
      );
    }
  },
  mounted() {
    this.$store.dispatch("getData");
  },
  components: {
    SingleItem
  }
};
</script>

<style lang="less" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  padding: 0;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-evenly;
  }
}
</style>