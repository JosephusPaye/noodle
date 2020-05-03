<template>
  <div
    class="noodle-shadow-root"
    :style="{ all: 'initial' }"
    v-show="!hidden"
  ></div>
</template>

<script>
import css from './styles/markdown.css';
import highlightCss from './styles/atom-one-light.hljs.css';
import { spaghettify } from './compiler';

export default {
  name: 'NoodlePreview',

  props: {
    html: String,
    hidden: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.shadowRoot = this.$el.attachShadow({ mode: 'open' });
    this.shadowRoot.addEventListener('click', this.onClick);
    this.updatePreview();
  },

  beforeDestroy() {
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('click', this.onClick);
    }
    this.shadowRoot = undefined;
  },

  watch: {
    html() {
      this.updatePreview();
    },
  },

  methods: {
    updatePreview() {
      if (this.html.trim().length === 0) {
        return;
      }

      // Naive approach that clears and re-renders everything.
      // Find a smarter update strategy if performance becomes a problem.
      this.shadowRoot.innerHTML = `
        <style>${css + highlightCss}</style>
        <div class="noodle-markdown">${this.html}</div>
      `;

      const markdown = this.shadowRoot.querySelector('.noodle-markdown');

      if (markdown) {
        const duplicateTree = markdown.cloneNode(true);
        spaghettify(duplicateTree, this.shadowRoot.styleSheets);
        this.$emit('spaghettified', duplicateTree.outerHTML);
      }
    },

    onClick(e) {
      const el = e.target;

      if (el.tagName != 'A') {
        return;
      }

      let href = el.getAttribute('href');

      if (href === null || href.trim().length === 0) {
        return;
      }

      href = href.trim();

      // Intercept anchor links and scroll to the target element
      if (href.startsWith('#')) {
        e.preventDefault();

        const name = href.slice(1);
        const target = this.shadowRoot.querySelector(
          `#${name}, a[name="${name}"`
        );

        if (target) {
          target.scrollIntoView();
        }
      }
      // Open all other links in a new tab
      else {
        el.setAttribute('target', '_blank');
      }
    },
  },
};
</script>
