<template>
  <div class="modal-content">
    <font-awesome-icon
      class="modal-icon modal-left"
      icon="arrow-left"
      @click="$emit('close-add-cat')"
    />
    <font-awesome-icon
      class="modal-icon modal-right"
      icon="times"
      @click="$emit('close-add-window')"
    />
    <AddCategory @close-add-cat="$emit('close-add-cat')" />
    <DeleteCat />
  </div>
</template>

<script>
import AddCategory from "./AddCategoty/AddCategory.vue";
import DeleteCat from "./DeleteCat/DeleteCat.vue";

export default {
  components: {
    AddCategory,
    DeleteCat
  }
};
</script>
