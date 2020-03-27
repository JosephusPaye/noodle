<template>
  <div id="app" class="h-screen grid grid-rows-1 grid-cols-2">
    <Editor v-model="input" :errors="errors" />
    <Preview :html="html" />
  </div>
</template>

<script>
import debounce from 'debounce';

import { compile } from './compiler';
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';

const compileDebounced = debounce((input, callback) => {
  try {
    const html = compile(input); // spegattify(markdown.compile(input));
    callback({ valid: true, html });
  } catch (err) {
    callback({ valid: false, errors: [err] });
  }
}, 200);

export default {
  name: 'App',
  components: {
    Editor,
    Preview,
  },
  data() {
    return {
      input: '',
      html: '',
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
        // console.error(errors);
        this.errors = errors;
      }
    },
  },
};
</script>

<style>
@import './assets/tailwind.css';

body {
  color: rgba(0, 0, 0, 0.87);
  @apply text-base;
}

#app {
  grid-template-rows: 1fr;
}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}
</style>
