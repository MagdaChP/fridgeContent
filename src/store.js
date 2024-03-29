import Vue from "vue";
import Vuex from "vuex";
import firebase from "../database";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    userId: "",
    isLoading: false,
    items: [],
    categories: [
      { id: "cat1", category: "meat", color: "rgb(238, 63, 101)" },
      { id: "cat2", category: "vegetables", color: "rgb(160, 114, 114)" },
      { id: "cat4", category: "fruits", color: "#b1ecb1" },
      { id: "cat3", category: "pastry", color: "rgb(240, 209, 126)" },
      { id: "cat5", category: "ready meal", color: "pink" }
    ]
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload;
      if (payload !== "" && payload !== null) {
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    },
    getItems(state, payload) {
      let displayData = [];
      for (let prop in payload) {
        displayData.push(payload[prop]);
      }
      state.items = displayData;
      state.isLoading = false;
    },
    setCategories(state, payload) {
      let displayCat = [];
      for (let cat in payload) {
        displayCat.push(payload[cat]);
      }
      state.categories.push(...displayCat);
      state.isLoading = false;
    },
    addItem(state, payload) {
      state.items.push(payload);
    },
    addCategory(state, payload) {
      state.categories.push(payload);
    },
    deleteCategory(state, payload) {
      state.categories = state.categories.filter( cat => {
        return cat.id !== payload;
      });
    },
    deleteItem(state, payload) {
      state.items = state.items.filter(el => {
        return el.id != payload;
      });
    },
    setEditedItem(state, payload) {
      state.items.find(e => payload == e.id).edit = true;
    },
    saveEdit(state, payload) {
      const editedElem = state.items.find(e => payload.id == e.id);
      editedElem.name = payload.name;
      editedElem.amount = payload.amount;
      editedElem.edit = false;
    },
    cancelEdit(state, payload) {
      state.items.find(e => payload == e.id).edit = false;
    }
  },
  actions: {
    async getData({ commit, state }) {
      state.isLoading = true;
      try {
        await firebase
          .database()
          .ref(state.userId + "/items/")
          .once("value", data => {
            commit("getItems", data.val());
          });
      } catch (error) {
        console.error(error);
      }
    },
    async getCategories({ commit, state }) {
      state.isLoading = true;
      try {
        await firebase
          .database()
          .ref(state.userId + "/categories/")
          .once("value", cat => {
            commit("setCategories", cat.val());
          });
      } catch (e) {
        console.error(e);
      }
    },
    async deleteCategory({commit}, id) {
      try {
        await firebase.database().ref(this.state.userId + "/categories/" + id).remove();
        commit("deleteCategory", id);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteData({ commit }, id) {
      try {
        await firebase
          .database()
          .ref(this.state.userId + "/items/" + id)
          .remove();
        commit("deleteItem", id);
      } catch (error) {
        console.error(error);
      }
    },
    async addNewItem({ commit }, context) {
      let newItemKey = firebase
        .database()
        .ref()
        .child(this.state.userId + "/items/")
        .push().key;
      let newItemData = {
        id: newItemKey,
        ...context,
        colors: this.state.categories,
        edit: false
      };
      let updates = {};
      updates[this.state.userId + "/items/" + newItemKey] = newItemData;
      try {
        await firebase
          .database()
          .ref()
          .update(updates);
        commit("addItem", newItemData);
      } catch (error) {
        console.error(error);
      }
    },
    async addNewCategory({ commit }, context) {
      let newCatKey = firebase
        .database()
        .ref()
        .child(this.state.userId + "/categories/")
        .push().key;
      let updates = {};
      updates[this.state.userId + "/categories/" + newCatKey] = context;
      console.log(typeof context);
      context.id = newCatKey;
      try {
        await firebase
          .database()
          .ref()
          .update(updates);
        commit("addCategory", context);
      } catch (error) {
        console.error(error);
      }
    },
    async editData({ commit }, context) {
      let updates = {};
      updates[this.state.userId + "/items/" + context.id] = { ...context };
      try {
        await firebase
          .database()
          .ref()
          .update(updates);
        commit("saveEdit", context);
      } catch (error) {
        console.error(error);
      }
    }
  }
});
