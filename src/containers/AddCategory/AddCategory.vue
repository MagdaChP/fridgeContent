<template>
  <div class="add-cat-background">
    <div class="add-cat-content">
      <font-awesome-icon class="icon" icon="times" @click="$emit('close-add-cat')" />
      <h2>Add new category</h2>
      <label>Caterory Name</label>
      <input type="text" v-model="newCategory" />
      <label>Color</label>
      <select v-model="selectedColor">
        <option v-for="color in colorsArray" :key="color" :style="{background: color}">{{ color }}</option>
      </select>
      <!-- <input type="color" /> -->
      <button @click="addCategory">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCategory: "",
      colorsArray: [
        "#ff8c66",
        "#ffb366",
        "#ffd966",
        "#ffff66",
        "#d9ff66",
        "#b3ff66",
        "#8cff66",
        "#66ff66",
        "#66ff8c",
        "#66ffb3",
        "#66ffd9",
        "#66ffff",
        "#66d9ff",
        "#66b3ff",
        "#668cff",
        "#6666ff",
        "#8c66ff",
        "#b366ff",
        "#d966ff",
        "#8a3f65",
        "#ff66ff",
        "#ff66d9",
        "#ff66b3",
        "#ff668c",
        "#ff6666"
      ],
      selectedColor: ""
    };
  },
  methods: {
    addCategory() {
      this.$store.dispatch("addNewCategory", {
        category: this.newCategory,
        color: this.selectedColor
      });
      this.$emit("close-add-cat");
    }
  }
};
</script>

<style lang="scss" scoped >
.add-cat-background {
  background: rgba(120, 120, 120, 0.5);
  position: absolute;
  top: -30px;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  .add-cat-content {
    position: absolute;
    max-width: 400px;
    max-height: 400px;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 4;
    padding: 20px;
    background: #fff;
    .icon {
      margin-left: auto;
      display: block;
      cursor: pointer;
    }
    h2 {
      font-weight: 600;
      margin: 10px 0 30px 0;
    }
    option {
      color: rgba(255, 255, 255, 0.01);
    }
    button {
      margin: 55px 0 0 0;
      display: inline-block;
    }
  }
}
</style>