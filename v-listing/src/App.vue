<template>
  <div id="app">
    <div class="card">
      <div class="head">
        <h1>Participants</h1>
      </div>
      <div class="board">
        <ul class="list">
          <!-- LIST ITEM -->
          <li
            class="list__item"
            v-for="personName of names"
            v-bind:key="personName['.key']"
            @click="setEditName(personName['.key'])"
          >
            <!-- ITEM NAME -->
            <p v-if="!personName.edit">
              {{ personName.name }}
            </p>

            <!-- FORM -->
            <div class="form" v-else>
              <input
                class="placeholder"
                type="text"
                v-model="personName.name"
              />
              <button @click="saveEditName(personName)">Save</button>
              <button @click="cancelEditName(personName['.key'])">
                Cancel
              </button>
              <button @click="removeName(personName)">Remove</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- ADD NEW USER -->
      <div class="action">
        <button @click="form ? (form = false) : (form = true)" class="button">
          <span v-if="!form">Add new</span>
          <span v-else>Cancel</span>
        </button>
      </div>
      <div class="action form" v-if="form">
        <label for="name">Name:</label>
        <input type="text" v-model="name" v-focus />
        <button @click="submitName()" class="button">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import { namesRef } from "./firebase";
import * as focus from "./focusDirective";

export default {
  data() {
    return {
      name: "",
      names: [],
      form: false,
    };
  },
  firebase: {
    names: namesRef,
  },
  methods: {
    submitName() {
      namesRef.push({ name: this.name, edit: false });
      this.name = "";
    },
    removeName(key) {
      namesRef.child(key).remove();
    },
    setEditName(key) {
      namesRef.child(key).update({ edit: true });
    },
    saveEditName(person) {
      const key = person[".key"];
      namesRef.child(key).set({ name: person.name, edit: false });
    },
    cancelEditName(key) {
      namesRef.child(key).update({ edit: false });
    },
    getFirstLetter(word) {
      let arrName = word.split(" ");
      let iniName = word.charAt(0);
      return iniName;
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>

<style>
body {
  background: #f7f7f8;
  margin: 0;
  padding: 0;
  font-size: 50%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

#app {
  display: flex;
  height: 100vh;
}

.card {
  margin: auto;
  background: #fff;
  color: #666186;

  border: 1px solid rgba(236, 235, 236, 1);
  box-shadow: 0px 3px 0px 0px rgba(232, 232, 233, 1);
  border-radius: 1em;
  width: 391px;

  display: flex;
  flex-direction: column;
}

.head {
  padding: 24px 16px;
  border-bottom: 1px solid #efefef;
}

.board {
  margin: 3em 0 0 0;
  padding: 0 3em;
}

.list {
  padding: 0;
  margin: 0;
}

.list__item {
  margin-bottom: 3em;
  list-style: none;
  display: flex;
  align-items: baseline;
  position: relative;
  z-index: 0;
  cursor: pointer;
}

.list__item::before {
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 12px 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fafafc;
  border-radius: 8px;
  z-index: -1;
  opacity: 0;
}

.list__item:hover::before {
  opacity: 1;
}

h1 {
  margin: 0;
  font-size: 2em;
  font-weight: 500;
  letter-spacing: 0.03em;
}

span.initial {
  display: inline-block;
  height: 32px;
  width: 32px;
  background: #f4f4f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-right: 16px;
}

p,
.placeholder {
  margin: 0;
  font-size: 14px;
  line-height: 116%;
  letter-spacing: 0.05em;
  color: #5d5b6b;
  padding: 8px;
}

.action {
  padding: 0 16px 16px 16px;
}

.button {
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  line-height: 116%;
  text-align: center;
  letter-spacing: 0.06em;
  color: #5c4dd0;
  background-color: #f4f4f7;
  border: 0;
  padding: 16px 0;
  border-radius: 4px;
}

input.placeholder {
  background: none;
  border: 0;
  outline: none;
  padding: 8px;
}
input.placeholder:focus {
  background: #f4f4f7;
}
</style>
