<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
    <!-- <div class="wrapper">
      <div class="box1"></div>
      <div class="box2"></div>
      <div class="box3"></div>
      <div class="box4"></div>
      <div class="box5"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f0f0f0;
}
* {
  margin: 0;
  padding: 0;
}
.wrapper div {
  height: 1rem;
}
.box1 {
  /* width: 2rem; */
  /* 750 * 20% */
  width: 150px;
  background-color: coral;
}
.box2 {
  /* width: 4rem; */
  /* 750 * 40% */
  width: 300px;
  background-color: skyblue;
}
.box3 {
  /* width: 6rem; */
  /* 750 * 60% */
  width: 450px;
  background-color: palegreen;
}
.box4 {
  /* width: 8rem; */
  /* 750 * 80% */
  width: 600px;
  background-color: wheat;
}
.box5 {
  /* width: 10rem; */
  /* 750 * 100% */
  width: 750px;
  background-color: darkred;
}
</style>
