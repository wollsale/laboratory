<template>
  <div id="app">
    <h1>Feed</h1>
    <section class="feed">
      <ul class="feed__list">
        <postInFeed
          v-for="post in posts"
          v-bind:key="post['.key']"
          :title="post.title"
          :content="post.content"
          :category="post.category"
          :postID="post['.key']"
        />
      </ul>
    </section>
  </div>
</template>

<script>
import { feed } from "../firebase";
import { categories } from "../firebase";
import postInFeed from "../components/postInFeed";

export default {
  name: "Feed",
  data() {
    return {
      postTitle: "",
      postContent: "",
      postCategory: "",
      posts: [],
    };
  },
  firebase: {
    posts: feed,
    cats: categories,
  },
  components: {
    postInFeed,
  },
  methods: {
    removePost(key) {
      feed.child(key).remove();
    },
  },
};
</script>

<style lang="scss">
</style>
