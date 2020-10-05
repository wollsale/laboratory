<template>
  <div id="app">
    <section class="form column">
      <input type="text" v-model="postTitle" placeholder="Your title" />
      <textarea
        v-model="postContent"
        name="postContent"
        cols="30"
        rows="10"
        placeholder="Your content"
      ></textarea>
      <div class="cat">
        <label for="postCategory">Choose a category:</label>
        <select
          name="postCategory"
          v-model="postCategory"
          @change="selectPostCat($event)"
        >
          <option disabled selected>Select...</option>
          <option v-for="cat in cats" v-bind:key="cat['.key']">
            {{ cat.title }}
          </option>
          <option value="setNewCat">Add New</option>
        </select>
        <p>or</p>
        <div class="form" v-if="setNewCat">
          <input
            type="text"
            v-model="newCatTitle"
            placeholder="Your new category"
          />
          <button @click="addNewCat()">Add new category</button>
        </div>
      </div>
      <button @click="submit()">Send</button>
    </section>
  </div>
</template>

<script>
import { feed } from "../firebase";
import { categories } from "../firebase";

export default {
  name: "addNewPost",
  data() {
    return {
      postTitle: "",
      postContent: "",
      postCategory: "",
      posts: [],
      categpries: [],
      cat: [],
      cats: [],
      newCatTitle: "",
      setNewCat: false,
    };
  },
  firebase: {
    posts: feed,
    cats: categories,
  },
  methods: {
    setNewCategory() {
      console.log("new");
    },
    submit() {
      feed.push({
        title: this.postTitle,
        content: this.postContent,
        category: this.postCategory,
      });
    },
    removePost(key) {
      feed.child(key).remove();
    },
    addNewCat() {
      categories.push({ title: this.newCatTitle });
      this.setNewCat = false;
    },
    selectPostCat(event) {
      event.target.value == "setNewCat"
        ? (this.setNewCat = true)
        : (this.setNewCat = false);
    },
  },
};
</script>

<style lang="scss">
section {
  margin-bottom: 4em;
}

.column {
  display: flex;
  flex-direction: column;
}
input,
button,
textarea,
select {
  padding: 1em;
  width: 100%;
  box-sizing: border-box;
}

// FEED
.feed {
  &__content {
    white-space: pre-line;
    word-wrap: break-word;
    font-family: inherit;
  }
}
</style>
