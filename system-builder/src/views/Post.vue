<template>
  <div>
    <h1>POST</h1>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p>{{ post.category }}</p>
  </div>
</template>

<script>
import { db } from "../firebase";
import { feed } from "../firebase";

const posts = db.ref("feed");

export default {
  name: "Post",
  props: ["id"],
  data() {
    return {
      id: this.$route.params.id,
      post: null,
    };
  },
  watch: {
    id: {
      // call it upon creation too
      immediate: true,
      handler(id) {
        this.$rtdbBind("post", posts.child(id));
      },
    },
  },
};
</script>

<style lang="scss">
</style>
