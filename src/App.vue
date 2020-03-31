<template>
  <div id="app" class="h-screen grid grid-rows-1 grid-cols-2">
    <Editor v-model="input" :errors="errors" />
    <div class="divider"></div>
    <Output :html="html" :spaghettified.sync="spaghettified" />
  </div>
</template>

<script>
import debounce from 'debounce';

import { compile } from './compiler';
import Editor from './components/Editor.vue';
import Output from './components/Output.vue';
import sample from './sample.md';

const compileDebounced = debounce((input, callback) => {
  try {
    const html = compile(input);
    callback({ valid: true, html });
  } catch (err) {
    callback({ valid: false, errors: [err] });
  }
}, 300);

export default {
  name: 'App',

  components: {
    Editor,
    Output,
  },

  data() {
    return {
      input: sample,
      html: '',
      spaghettified: '',
      errors: [],
    };
  },

  watch: {
    input(input) {
      this.compileMarkdown();
    },
  },

  mounted() {
    this.compileMarkdown();
  },

  methods: {
    compileMarkdown() {
      compileDebounced(this.input, this.onCompile);
    },

    onCompile({ html, valid, errors }) {
      if (valid) {
        this.html = html;
        this.errors = [];
      } else {
        console.error(errors);
        this.errors = errors;
      }
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

#app {
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
