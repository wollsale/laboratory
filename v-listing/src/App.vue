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
          >
            <!-- ITEM NAME -->
            <span class="initial" v-if="personName.name">{{
              getFirstLetter(personName.name)
            }}</span>
            <p
              v-if="!personName.edit"
              tabindex="0"
              @focus="setEditName(personName['.key'])"
            >
              {{ personName.name }}
            </p>

            <!-- FORM -->
            <div class="form form--placeholder flex" v-else>
              <input
                class="placeholder"
                type="text"
                v-model="personName.name"
                v-focus
                tabindex="0"
              />
              <div class="options">
                <button class="button" @click="saveEditName(personName)">
                  Save
                </button>
                <!-- <button @click="cancelEditName(personName['.key'])">Cancel</button> -->
                <button class="button" @click="removeName(personName['.key'])">
                  &#128465;
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- ADD NEW USER -->
      <div class="action form" v-if="form">
        <input
          type="text"
          placeholder="Name"
          class="input_add"
          v-model="name"
          v-focus
        />
        <button @click="submitName()" class="button button--primary">
          Add
        </button>
      </div>
      <div class="action">
        <button @click="form ? (form = false) : (form = true)" class="button">
          <span v-if="!form">&#43; Add new</span>
          <span v-else>Cancel</span>
        </button>
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
      this.form = false;
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
  margin-bottom: 2em;
  list-style: none;
  display: flex;
  align-items: baseline;
  position: relative;
  z-index: 0;
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

.flex {
  display: flex;
}

h1 {
  margin: 0;
  font-size: 2em;
  font-weight: 500;
  letter-spacing: 0.03em;
}

p {
  cursor: pointer;
}

span.initial {
  min-height: 32px;
  min-width: 32px;
  background: #f4f4f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-right: 8px;
}

p,
.placeholder,
.input_add {
  margin: 0;
  font-size: 14px;
  line-height: 116%;
  letter-spacing: 0.05em;
  color: #5d5b6b;
  padding: 16px 8px;
  width: 100%;
  border-radius: 4px;
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
  cursor: pointer;
}
.button--primary {
  background: #5c4dd0;
  color: #f4f4f7;
}
.button:hover {
  background-color: #ebebf0;
}
.button--primary:hover {
  background-color: #5143bb;
}

input.placeholder,
.input_add {
  background: none;
  border: 0;
  outline: none;
}
input.placeholder:focus,
.input_add:focus {
  background: #f4f4f7;
}

.form--placeholder {
  width: 100%;
}

.options {
  display: flex;
}

.options .button {
  padding: 8px 16px;
  margin-left: 8px;
}

.input_add {
  border: 1px solid #f4f4f7;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding-left: 16px;
}

.v-enter {
  transform: scale(1);
  transition: all 0.4s ease-in-out;
}

.v-leave {
  transform: scale(0);
  transition: all 0.4s ease-in-out;
}
</style>
