<template>
  <li :style="{ backgroundColor}">
    <div v-if="!itemData.edit">
      <div class="content-wrapper">
        <p v-if="itemData.enterDate" class="enter-date">{{itemData.enterDate}}</p>
        <p>
          {{itemData.amount}}
          <span>{{itemData.name}}</span>
        </p>
        <div class="icons-wrapper">
          <font-awesome-icon class="icon" icon="trash" @click="deleteItem(itemData.id)"/>
          <font-awesome-icon class="icon" icon="edit" @click="editData(itemData.id)"/>
        </div>
      </div>
    </div>
    <EditItem :editedEl="itemData" v-else/>
  </li>
</template>

<script>
import EditItem from "../EditItem/EditItem";

export default {
  data() {
    return {
      categories: this.$store.state.options,
      backgroundColor: ""
    };
  },
  mounted: function() {
    this.categories.forEach(elem => {
      if (elem.category === this.itemData.category) {
        this.backgroundColor = elem.color;
      }
    });
  },
  methods: {
    deleteItem(id) {
      this.$store.dispatch("deleteData", id);
    },
    editData(id) {
      this.$store.commit("setEditedItem", id);
    }
  },
  props: { itemData: Object },
  components: { EditItem }
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
}

li {
  list-style-type: none;
  width: 20%;
  min-height: 100px;
  min-width: 150px;
  margin: 5px;
  padding: 2px;
  word-wrap: break-word;
  list-style-position: inside;
  & > div {
    height: 100%;
    .content-wrapper {
      height: 100%;
      padding: 5px;
      .enter-date {
        font-size: 0.8em;
      }
      p {
        margin: 20px 0 0 0;
        span {
          font-weight: 600;
          font-size: 1.1em;
        }
      }
      .icons-wrapper {
        margin: 20px 0px 0 0;
      }
    }
    .icon {
      margin: 0 0 0 15px;
      cursor: pointer;
      &:first-child {
        margin: 0;
      }
    }
  }
}
</style>

