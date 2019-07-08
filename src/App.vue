<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  display: inline-block;
  padding: 5px;
  margin: 0 15px 20px 0;
  color: grey;
  // background: rgb(243, 234, 199);
}

label {
  margin: 25px 0 0 0;
  text-align: left;
  display: block;
  position: relative;
  left: 20px;
  font-size: 0.7em;
  color: #444;
  font-weight: 600;
  text-transform: uppercase;
}

input,
select {
  padding: 10px 10px 5px 10px;
  max-width: 300px;
  width: 100%;
  border: none;
  border-bottom: 1px solid rgb(10, 37, 17);
  color: #444;
  &:focus {
    outline: none;
  }
}

button {
  width: 40%;
  max-width: 200px;
  padding: 10px;
  background: #2c3e50;
  border: none;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1.6px;
  cursor: pointer;
}
</style>
