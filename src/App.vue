<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn-success {
  background-color: rgba(22, 119, 115, 1) !important;
  border: rgba(22, 119, 115, 1) solid 1px !important;
}

.btn-success:hover {
  background-color: rgb(26, 100, 98) !important;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: rgba(22, 119, 115, 1);
}
</style>
