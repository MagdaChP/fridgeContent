import Spinner from "../../components/Spinner/spinner";
import SingleItem from "../../components/SingleItem/SingleItem";

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
    this.getCategories();
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getData");
        if (!this.isLoading) {
          this.itemsToShow = this.$store.state.items;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getCategories() {
      try {
        await this.$store.dispatch("getCategories");
        if (!this.isLoading) {
          this.getData();
        }
      } catch (e) {
        console.erroe(e);
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
    SingleItem
  }
};
