<template>
  <div class="modal-background">
    <div class="add-item-wrapper modal-content" v-if="addItem">
      <font-awesome-icon
        class="modal-icon modal-right"
        icon="times"
        @click="$emit('close-add-form')"
      />
      <h2>Add Item</h2>
      <div>
        <label>Product Name:</label>
        <input
          :class="[invalid ? 'invalid-border' : '']"
          v-model="itemName"
          type="text"
        />

        <label class="cat-selection">
          <font-awesome-icon
            class="icon"
            icon="cog"
            @click="editCategories"
          />Category:
        </label>

        <select :class="[invalid ? 'invalid-border' : '']" v-model="category">
          <option disabled class="disabled-option"></option>
          <option v-for="(option, i) in categoriesArray" :key="i">{{
            option.category
          }}</option>
        </select>

        <!-- <add-new-category v-if="showEditCat" @close-add-cat="closeAddCat" /> -->
        <label>Enter Date:</label>
        <input v-model="enterDate" type="date" />

        <label>Product amount or weight:</label>
        <input v-model="amount" type="string" />
      </div>
      <button @click="validate">Save</button>
    </div>
    <EditCategory
      v-if="!addItem && showEditCat"
      @close-add-window="closeAddModal"
      @close-add-cat="closeAddCat"
    />
  </div>
</template>

<script src="./AddItemScript.js" />
<style lang="scss" scoped src="./AddItem.scss" />
