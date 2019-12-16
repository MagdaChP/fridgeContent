<template>
  <div class="add-item-wrapper">
    <div>
      <label>Product Name:</label>
      <input :class="[invalid ? 'invalid' : '']" v-model="itemName" type="text">

      <label>
        <!-- <button @click="addCategory">Add new cat</button> -->
        Category:
      </label>
      <select :class="[invalid ? 'invalid' : '']" v-model="category">
        <option disabled value></option>
        <option v-for="(option, i) in options" :key="i">{{option.category}}</option>
      </select>

      <label>Enter Date:</label>
      <input v-model="enterDate" type="date">

      <label>Product amount or weight:</label>
      <input v-model="amount" type="string">
    </div>
    <button @click="validate">Save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemName: "",
      enterDate: null,
      amount: "",
      category: "",
      options: this.$store.state.options,
      invalid: false
    };
  },
  methods: {
    addCategory() {
      console.log("Add Cat");
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
  div {
    width: 100%;
    max-width: 400px;
    position: relative;
    label {
      margin: 25px 0 0 0;
      text-align: left;
      display: block;
      position: relative;
      left: 20px;
      font-size: .7em;
      color: #444;
      font-weight: 600;
      text-transform: uppercase;
    }
    input,
    select {
      padding: 10px 10px 5px 10px;
      max-width: 300px;
      width: 100%;
      border: none;
      border-bottom: 1px solid rgb(10, 37, 17);
      color: #444;
      &:focus {
        outline: none;
      }
      select {
        width: 49%;
      }
    }
  }
  button {
    width: 40%;
    max-width: 200px;
    margin: 35px auto;
    padding: 10px;
    background: #444;
    border: none;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1.6px;
    cursor: pointer;
  }
  .invalid {
    border-color: red;
  }
}
</style>

