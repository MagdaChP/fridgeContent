<template>
  <div v-if="userLogged" class="container">
    <div class="header-wrapper">
      <button class="logout-btn" @click="userLogOut">Log Out</button>
    </div>
    <h2>Add Item</h2>
    <AddItem />
    <router-link to="/sortByDate">Date</router-link>
    <router-link to="/sortByName">Category Name</router-link>
    <router-link
      v-for="(category, i) in categories"
      :key="i"
      :to="'/' + category.category"
    >{{category.category}}</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import AddItem from "../AddItem/AddItem";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Container",
  computed: {
    categories() {
      return this.$store.state.options;
    },
    userLogged() {
      return this.$store.state.loggedIn;
    }
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit("setUserId", user.uid);
      } else {
        this.userLogOut();
      }
    });
  },
  methods: {
    async userLogOut() {
      try {
        await firebase.auth().signOut();
        this.$router.push({ path: "/login" });
        this.$store.commit("setUserId", "");
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: {
    AddItem
  }
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  .header-wrapper {
    width: 100%;
    height: 30px;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 2;
    padding: 0 0 0 50%;
  }
}
.logout-btn {
  font-size: 0.8em;
  padding: 5px;
  max-width: 100px;
  background: #888;
  // margin: 0px 80%;
  letter-spacing: 1px;
}
h2 {
  font-size: 1.5em;
  font-weight: 600;
  margin: 30px auto;
}
a {
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  display: inline-block;
  padding: 5px 10px;
  margin: 0 10px 20px;
  text-transform: capitalize;
  color: #444;
  border-left: 1px solid #444;
  &:hover {
    color: #008b8b;
    border-left: 1px dotted #008b8b;
  }
}

.router-link-active {
  color: #008b8b;
  border-left: 1px solid #008b8b;
}
</style>
