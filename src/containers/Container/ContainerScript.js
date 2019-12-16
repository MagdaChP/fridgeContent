import AddItem from "../AddItem/AddItem";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Container",
  data() {
    return {
      showAddForm: false,
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
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
    addItem() {
      this.showAddForm = true;
    },
    closeAddForm() {
      this.showAddForm = false;
    },
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