<template>
  <div id="app">
    <Noodle
      class="noodle-app h-screen w-full"
      :input="input"
      v-slot="{ output, errors, previewAttrs, previewEvents }"
    >
      <Editor v-model="input" :errors="errors" />
      <div class="divider"></div>
      <Output :html="output">
        <NoodlePreview
          v-bind="previewAttrs"
          v-on="previewEvents"
          slot="preview"
        />
      </Output>
    </Noodle>
  </div>
</template>

<script>
import debounce from 'debounce';
import { Noodle, NoodlePreview } from './lib/dist/noodle';

import Editor from './components/Editor.vue';
import Output from './components/Output.vue';

const localStorageInputKey = 'noodle:input';

function getDefaultInput() {
  const previousInput = localStorage.getItem(localStorageInputKey);
  return previousInput ? previousInput : '';
}

const persistInput = debounce(input => {
  if (input) {
    localStorage.setItem(localStorageInputKey, input);
  }
}, 250);

export default {
  name: 'App',

  components: {
    Editor,
    Output,
    Noodle,
    NoodlePreview,
  },

  data() {
    return {
      input: getDefaultInput(),
    };
  },

  watch: {
    input(input) {
      persistInput(input);
    },
  },
};
</script>

<style lang="scss">
@import './assets/tailwind.css';

body {
  color: rgba(0, 0, 0, 0.87);
  @apply text-base;
}

.noodle-app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4px 1fr;

  @screen lg {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 4px 1fr;
  }
}

.divider {
  background-color: #888;
}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}
</style>
