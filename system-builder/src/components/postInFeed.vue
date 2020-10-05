<template>
  <li class="feed__item">
    <router-link :to="{ name: 'post', params: { id: postID } }">
      <h2>{{ title }}</h2>
      <p class="feed__content">#{{ category }}</p>
      <a href="#" @click="removePost(post['.key'])">Remove</a>
    </router-link>
  </li>
</template>

<script>
import { feed } from "../firebase";
import { categories } from "../firebase";

export default {
  name: "postInFeed",
  data() {
    return {};
  },
  firebase: {
    posts: feed,
  },
  props: ["postID", "title", "content", "category"],
  methods: {
    removePost(key) {
      feed.child(key).remove();
    },
  },
};
</script>

<style lang="scss">
</style>
