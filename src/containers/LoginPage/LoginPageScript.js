import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      login: true,
      register: false,
      email: "",
      password: "",
      password2: "",
      invalid: false,
      invalidEmail: false,
      invalidMsg: "",
      infoMsg: ""
    };
  },
  methods: {
    toggleRegisterComp() {
      this.login = !this.login;
      this.register = !this.register;
    },
    async userRegistration() {
      this.validate();
      this.validateRegister();
      const email = this.email;
      const password = this.password;
      if (!this.invalid && !this.invalidEmail) {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
          this.setUser();
        } catch (error) {
          this.validateError(error);
          console.log(error);
        }
      }
    },
    async userLogin() {
      this.validate();
      const email = this.email;
      const password = this.password;
      if (!this.invalid && !this.invalidEmail) {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          this.setUser();
        } catch (error) {
          this.validateError(error);
          console.log(error);
        }
      }
    },
    setUser() {
      const userId = firebase.auth().currentUser.uid;
      this.$store.commit("setUserId", userId);
      this.$router.push({ path: "/sortByDate" });
    },
    async resetPassword() {
      if (this.email !== "" && this.email.indexOf("@") !== -1) {
        try {
          await firebase.auth().sendPasswordResetEmail(this.email);
          this.infoMsg = "Check your mailbox !";
          console.log(this.infoMsg);
        } catch (e) {
          console.log(e);
        }
      } else {
        this.invalidEmail = true;
      }
    },
    validate() {
      if (this.email !== "" && this.email.indexOf("@") !== -1) {
        this.invalidEmail = false;
      } else {
        this.invalidEmail = true;
      }

      if (this.password == "") {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    },
    validateError(error) {
      if (
        error.code.indexOf("wrong-password") > 0 ||
        error.code.indexOf("user-not-found") > 0
      ) {
        this.invalidMsg = "Invalid e-email or password";
      } else if (error.code.indexOf("invalid-email") > 0) {
        this.invalidMsg = error.message;
      } else if (error.code.indexOf("weak-password")) {
        this.invalidMsg = error.message;
      }
    },
    validateRegister() {
      if (this.password2 == "") {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
      if (this.password !== this.password2) {
        this.invalid = true;
        this.invalidMsg =
          "The repeated password does not match the first one :(";
      }
    }
  }
};