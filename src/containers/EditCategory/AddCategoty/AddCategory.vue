<template>
  <div class="add-cat-content" :data-error="errorMsg">
    <h2>Add new category</h2>
    <label>Caterory Name</label>
    <input type="text" v-model="newCategory" />
    <label>Color</label>

    <select v-model="selectedColor">
      <option
        v-for="color in colorsArray"
        :key="color"
        :style="{ background: color + ' !important' }"
        >{{ color }}</option
      >
    </select>

    <!-- <input type="color" /> -->
    <button @click="addCategory">ADD</button>
  </div>
</template>

<script src="./AddCategoryScript.js" />
<style lang="scss" scoped src="./AddCategory.scss" />