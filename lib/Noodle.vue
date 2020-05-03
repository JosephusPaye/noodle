<template>
  <div class="noodle">
    <slot
      :output="spaggetified"
      :errors="errors"
      :previewAttrs="{ html: html }"
      :previewEvents="{ spaghettified: onSpaghettified }"
    ></slot>
  </div>
</template>

<script>
import debounce from 'debounce';
import { compile } from './compiler';

export default {
  name: 'Noodle',

  props: {
    input: String,
    debounceTimeout: {
      type: Number,
      default: 250,
    },
  },

  data() {
    return {
      html: '',
      spaggetified: '',
      errors: [],
    };
  },

  watch: {
    input(newInput) {
      this.debouncedCompile(newInput);
    },

    debounceTimeout() {
      this.initDebouncedCompile();
    },
  },

  created() {
    this.initDebouncedCompile();
  },

  mounted() {
    this.debouncedCompile(this.input);
  },

  methods: {
    initDebouncedCompile() {
      if (this.debouncedCompile && this.debouncedCompile.clear) {
        this.debouncedCompile.clear();
      }

      this.debouncedCompile =
        this.debounceTimeout > 0
          ? debounce(this.compile, this.debounceTimeout)
          : this.compile;
    },

    onSpaghettified(spaghettified) {
      this.spaggetified = spaghettified;
    },

    compile(input) {
      try {
        this.html = compile(input);
        this.errors = [];
      } catch (err) {
        this.errors = [err];
      }
    },
  },
};
</script>
