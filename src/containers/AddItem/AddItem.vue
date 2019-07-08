<template>
  <div class="add-item-wrapper">
    <div>
      <label>Product Name:</label>
      <input :class="[invalid ? 'invalid' : '']" v-model="itemName" type="text" />

      <label>Category:</label>
      <select :class="[invalid ? 'invalid' : '']" v-model="category">
        <option disabled></option>
        <option v-for="(option, i) in categoriesArray" :key="i">{{option.category}}</option>
      </select>
      <font-awesome-icon class="icon" icon="plus" @click="addCategory"/>
      <add-new-category v-if="showAddCat" @close-add-cat="closeAddCat"/>
      <label>Enter Date:</label>
      <input v-model="enterDate" type="date" />

      <label>Product amount or weight:</label>
      <input v-model="amount" type="string" />
    </div>
    <button @click="validate">Save</button>
  </div>
</template>

<script>
import AddNewCategory from "../AddCategory/AddCategory.vue";

export default {
  data() {
    return {
      itemName: "",
      enterDate: null,
      amount: "",
      category: "",
      invalid: false,
      showAddCat: false
    };
  },
  computed: {
    categoriesArray() {
      return this.$store.state.options;
    }
  },
  beforeMount() {
    this.$store.dispatch("getCategories");
  },
  methods: {
    addCategory() {
      this.showAddCat = !this.showAddCat;
    },
    closeAddCat() {
      this.showAddCat = false;
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
    AddNewCategory
  }
};
</script>

<style lang="less" scoped>
.add-item-wrapper {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  .icon {
    margin: 0 0 0 5px;
  }
  & > div {
    width: 100%;
    max-width: 400px;
  }
  button {
    margin: 35px auto;
  }
  .invalid {
    border-color: red;
  }
}
</style>

