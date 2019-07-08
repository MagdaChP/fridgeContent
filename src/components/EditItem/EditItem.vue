<template>
  <div>
    <input v-model="editedName" type="text" placeholder="product name">
    <input v-model="editedAmount" type="text" placeholder="product amount">
    <div class="btn-wrapper">
      <button @click="saveEdit"><font-awesome-icon class="icon edit-ok" icon="check"/></button>
      <button @click="cancelEdit" class="edit-cancel"><font-awesome-icon class="icon" icon="times"/></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedName: this.editedEl.name,
      editedAmount: this.editedEl.amount
    };
  },
  methods: {
    saveEdit() {
      this.$store.dispatch({
        type: "editData",
        ...this.editedEl,
        name: this.editedName,
        amount: this.editedAmount,
        edit: false
      });
    },
    cancelEdit() {
      this.$store.commit("cancelEdit", this.editedEl.id);
    }
  },
  props: { editedEl: Object }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
div {
  width: 100%;
  padding: 5px 0;
  input:first-child {
    margin: 0 0 5px;
  }
  input {
    padding: 5px;
    width: 80%;
    background: rgba(255, 255, 255, 0);
  }
  .btn-wrapper {
    margin: 15px 0 5px 0;
    color: #fff;
    button {
      padding: 4px;
      font-size: 0.8em;
      font-weight: 500;
    }
    button:first-child {
      margin: 0 10px 0 0;
    }
    .edit-cancel {
      background: #555;
    }
  }
}
</style>
