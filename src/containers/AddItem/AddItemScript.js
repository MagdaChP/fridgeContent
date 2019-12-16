import EditCategory from "../EditCategory/EditCategory.vue";

export default {
  data() {
    return {
      itemName: "",
      enterDate: null,
      amount: "",
      category: "",
      invalid: false,
      showEditCat: false,
      addItem: true,
      openModal: false
    };
  },
  computed: {
    categoriesArray() {
      return this.$store.state.categories;
    }
  },
  methods: {
    closeAddItem() {
      this.addItem = false;
      this.openModal = false;
    },
    editCategories() {
      this.showEditCat = !this.showEditCat;
      this.addItem = false;
    },
    closeAddModal() {
      this.$emit("close-add-form");
      this.showEditCat = false;
    },
    closeAddCat() {
      this.showEditCat = false;
      this.addItem = true;
    },
    validate() {
      if (this.itemName !== "" && this.category !== "") {
        this.invalid = false;
        this.sendData();
      } else {
        this.invalid = true;
      }
    },
    sendData() {
      const itemData = {
        name: this.itemName,
        enterDate: this.enterDate,
        amount: this.amount,
        category: this.category
      };
      this.$store.dispatch("addNewItem", itemData);
      this.itemName = "";
      this.enterDate = "";
      this.amount = "";
      this.category = "";
    }
  },
  components: {
    EditCategory
  }
};
