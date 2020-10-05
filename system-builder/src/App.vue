<template>
  <div id="app">
    <ul>
      <li><router-link to="/">Feed</router-link></li>
      <li><router-link to="/addNewPost">Add New Post</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
</style>
