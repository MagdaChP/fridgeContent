<template>
  <div class="page-wrapper">
    <div class="content-wrapper">
      <h1>My App</h1>
      <div
        @keyup.enter="userLogin"
        v-if="login"
        :data-invalid-msg="invalidMsg"
        :data-info-msg="infoMsg"
        class="form-wrapper login-wrapper"
      >
        <label>e-mail</label>
        <input type="email" v-model="email" :class="[invalidEmail ? 'invalid' : '']" />
        <label>password</label>
        <input type="password" v-model="password" :class="[invalid ? 'invalid' : '']" />
        <button @click="userLogin">Login</button>
        <button class="resetPassBtn" @click="resetPassword">Reset Password</button>
      </div>
      <div
        v-else
        @keyup.enter="userRegistration"
        :data-invalid-msg="invalidMsg"
        class="form-wrapper register-wrapper"
      >
        <label>e-mail</label>
        <input :class="[invalidEmail ? 'invalid' : '']" type="email" v-model="email" />
        <label>password</label>
        <input :class="[invalid ? 'invalid' : '']" type="password" v-model="password" />
        <label>repeat password</label>
        <input :class="[invalid ? 'invalid' : '']" type="password" v-model="password2" />
        <button @click="userRegistration">Register</button>
      </div>
      <div class="btn-wrapper">
        <button class="toggleBtn" @click="toggleRegisterComp">{{ login ? 'register user' : 'login'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
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
</script>

<style lang="scss" scoped>
%msg-style {
  font-weight: 600;
  letter-spacing: 1.5px;
  font-size: 0.9em;
  font-style: italic;
  margin: 22px 0 0 0;
  display: block;
}
.page-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  .content-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 480px;
    margin: auto;
    h1 {
      font-size: 3.5em;
      font-weight: 600;
      margin: 0 0 5% 0;
    }
    .form-wrapper {
      margin: 0 auto;
      width: 100%;
      max-width: 400px;
      position: relative;
      &:before {
        content: attr(data-info-msg);
        color: #42b882;
        @extend %msg-style;
      }
      &:after {
        color: red;
        content: attr(data-invalid-msg);
        @extend %msg-style;
      }
      button {
        display: block;
        margin: 30px auto;
      }
      .resetPassBtn {
        font-size: 0.8em;
        margin: 30px auto 0;
        display: block;
        padding: 5px;
        font-weight: 500;
      }
    }
    .btn-wrapper {
      margin: 20px auto;
      .toggleBtn {
        padding: 5px;
        background: #555;
        font-size: 0.9em;
        min-width: 90px;
      }
    }
  }
  .invalid {
    border-color: red;
  }
}
</style>

