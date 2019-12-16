<template>
  <div>
    <h2>Delete category</h2>
    <label>Caterory Name</label>
    <select v-model="delatedCategory" @change="setDelCatId">
      <option disabled class="disabled-option"></option>
      <option v-for="(cat, i) in categoriesArray" :key="cat + i">{{ cat.category }}</option>
    </select>
    <span :class="[indelibleCat ? 'invalidDel' : 'hide']">{{ errorMsg }}</span>
    <button class="delete-cat-btn" @click="deleteCat">Delete</button>
  </div>
</template>

<script src="./DeleteCatScript.js" />
<style lang="scss" scoped src="./DeleteCat.scss" />
