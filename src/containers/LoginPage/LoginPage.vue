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
        <input type="email" v-model="email" :class="[invalidEmail ? 'invalid-border' : '']" />
        <label>password</label>
        <input type="password" v-model="password" :class="[invalid ? 'invalid-border' : '']" />
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
        <input :class="[invalidEmail ? 'invalid-border' : '']" type="email" v-model="email" />
        <label>password</label>
        <input :class="[invalid ? 'invalid-border' : '']" type="password" v-model="password" />
        <label>repeat password</label>
        <input :class="[invalid ? 'invalid-border' : '']" type="password" v-model="password2" />
        <button @click="userRegistration">Register</button>
      </div>
      <div class="btn-wrapper">
        <button class="toggleBtn" @click="toggleRegisterComp">{{ login ? 'register user' : 'login'}}</button>
      </div>
    </div>
  </div>
</template>

<script src="./LoginPageScript.js" />
<style lang="scss" scoped src="./LoginPage.scss" />

