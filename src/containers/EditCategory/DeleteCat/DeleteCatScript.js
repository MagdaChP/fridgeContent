export default {
    data() {
      return {
        itemsArray: this.$store.state.items,
        catToDelate: "",
        delatedCategory: null,
        selectedCat: null,
        delCatId: null,
        indelibleCat: false,
        usedCategories: null,
        errorMsg: ''
      };
    },
    computed: {
      categoriesArray() {
        return this.$store.state.categories;
      }
    },
    methods: {
      setDelCatId(e) {
        this.selectedCat = this.categoriesArray.filter(
          elem => elem.category === e.target.value
        )[0];
        if (this.selectedCat.id.length > 5) {
          this.indelibleCat = false;
          this.delCatId = this.selectedCat.id;
        } else {
          this.indelibleCat = true;
          this.errorMsg = "Default value can't be removed";
        }
      },
      deleteCat() {
        this.validate();
        if (this.usedCategories.length === 0) {
          this.$store.dispatch("deleteCategory", this.delCatId);
        } else {
          let ocupatedCat = '';
          this.usedCategories.forEach( elem => {
            console.log(elem.name);
            ocupatedCat = ocupatedCat + ` ${elem.name}`;
          });
          this.indelibleCat = true;
          this.errorMsg = `Category is used for ${ocupatedCat}`;
        }
      },
      validate() {
        this.usedCategories = this.itemsArray.filter( item => {
          return item.category === this.selectedCat.category;
        });
      }
    }
  };