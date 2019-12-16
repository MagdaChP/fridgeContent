<template>
  <div class="form-wrapper">
    <AddItem/>
    <div class="sort-btns">
      <button
        class="sort-category-btn"
        @click="setSortCategories()"
      >{{sorted ? 'Sort by date' : 'Sort by category'}}</button>
    </div>
    <ul>
      <SingleItem v-for="item in showItems" :key="item.id" :itemData="item"/>
    </ul>
    <Spinner v-if="isLoading"/>
  </div>
</template>

<script>
import Spinner from "../Spinner/spinner";
import SingleItem from "../SingleItem/SingleItem";
import AddItem from "../AddItem/AddItem";

export default {
  data() {
    return {
      itemsToShow: this.showItems,
      sorted: false
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    showItems: {
      get: function() {
        return this.$store.state.items;
      },
      set: function(testValue) {
        if (this.sorted) {
          this.itemsToShow = testValue;
        } else {
          this.itemsToShow = this.$store.state.items;
        }
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getData");
        if (!this.isLoading) {
          this.itemsToShow = this.$store.state.items;
        }
      } catch (error) {
        console.log(error);
      }
    },
    setSortCategories() {
      this.sorted = !this.sorted;
      this.sortCategories();
    },
    sortCategories() {
      let sortedArray = [...this.showItems].sort((a, b) => {
        const genereA = a.category.toUpperCase();
        const genereB = b.category.toUpperCase();

        let comparsion = 0;
        if (genereA > genereB) {
          comparsion = 1;
        } else if (genereA < genereB) {
          comparsion = -1;
        }
        return comparsion;
      });
      this.showItems = sortedArray;
    }
  },
  components: {
    Spinner,
    SingleItem,
    AddItem
  }
};
</script>

<style lang="less" scoped>
.form-wrapper {
  padding: 0 10px;
  .sort-btns {
    width: 80%;
    margin: 0 auto 20px;
    text-align: left;
    @media (max-width: 768px) {
      width: 100%;
    }
    .sort-category-btn {
      cursor: pointer;
      width: 77px;
      max-width: 200px;
      margin: 5px auto;
      padding: 10px;
      background: #888;
      border: none;
      color: #fff;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1.2px;
      font-size: 0.6em;
    }
  }
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
}
</style>


