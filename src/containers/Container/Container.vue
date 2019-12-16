<template>
  <div v-if="userLogged" class="container">
    <div class="header-wrapper">
      <button class="header-btn" @click="addItem">Add</button>
      <button class="header-btn logout-btn" @click="userLogOut">Log Out</button>
    </div>
    <nav>
      <router-link to="/sortByDate">Date</router-link>
      <router-link to="/sortByName">Category Name</router-link>
      <router-link
        v-for="(category, i) in categories"
        :key="i"
        :to="'/' + category.category"
        >{{ category.category }}</router-link
      >
    </nav>
    <router-view></router-view>
    <AddItem v-if="showAddForm" @close-add-form="closeAddForm" />
  </div>
</template>

<script src="./ContainerScript.js" />
<style scoped lang="scss" src="./Container.scss" />