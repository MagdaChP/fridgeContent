<template>
  <div class="form-wrapper">
    <transition-group name="fade" tag="ul">
      <SingleItem v-for="item in showItems" :key="item.id" :itemData="item" />
    </transition-group>
    <Spinner v-if="isLoading" />
  </div>
</template>

<script src="./ListWrapperScript.js" />
<style lang="scss" scoped src="./ListWrapper.scss" />
