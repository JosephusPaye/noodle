<template>
  <div id="app">
    <Noodle
      class="noodle-app h-screen w-full"
      :input="doc.content"
      v-slot="{ output, errors, previewAttrs, previewEvents }"
    >
      <Editor v-model="doc.content" :errors="errors" />
      <div class="divider"></div>
      <Output
        ref="output"
        :title.sync="doc.title"
        :html="output"
        :spaghettified="output"
        @save="saveDocument"
      >
        <DocumentLibrary
          slot="library"
          :documents="savedDocumentTitles"
          :current-document="doc.title"
          @select="loadSavedDocument"
        />
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
import debounce from 'lodash.debounce';
import { Noodle, NoodlePreview } from '@josephuspaye/noodle';

import * as storage from './storage';
import Editor from './components/Editor.vue';
import Output from './components/Output.vue';
import DocumentLibrary from './components/DocumentLibrary.vue';

export default {
  name: 'App',

  components: {
    Editor,
    Output,
    Noodle,
    NoodlePreview,
    DocumentLibrary,
  },

  data() {
    return {
      savedDocumentTitles: storage.getSavedDocumentTitles(),
      doc: storage.getLastOpenDocument({
        title: 'Untitled',
        content: '',
        saved: false,
      }),
    };
  },

  watch: {
    'doc.saved'() {
      this.updatePageTitle();
    },

    'doc.title'(newTitle) {
      this.doc.saved = false;
      this.onTitleChange(newTitle, this.doc.content);
    },

    'doc.content'(newContent) {
      this.doc.saved = false;
      this.onContentChange(this.doc.title, newContent);
    },
  },

  created() {
    this.onTitleChange = debounce(this.onTitleChange, 300, {
      leading: true,
      trailing: true,
    });

    this.onContentChange = debounce(this.onContentChange, 300, {
      leading: true,
      trailing: true,
    });
  },

  mounted() {
    this.updatePageTitle();
    document.addEventListener('keydown', this.onKeyDown);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown);
  },

  methods: {
    onKeyDown(e) {
      if (!e.ctrlKey || e.key !== 's') {
        return;
      }

      e.preventDefault();

      this.saveDocument();
    },

    updatePageTitle(title = this.doc.title) {
      document.title = `${title} ${this.doc.saved ? '' : '*'} – Noodle`;
    },

    onTitleChange(title, content) {
      this.updatePageTitle(title);
      storage.setLastOpenDocument({ title, content, saved: false });
    },

    onContentChange(title, content) {
      // Don't empty the saved document when the editor is emptied,
      // only when the user overwrites with new content
      if (content.trim().length === 0) {
        return;
      }

      storage.setLastOpenDocument({ title, content, saved: false });
    },

    saveDocument() {
      this.doc.saved = true;

      storage.saveDocument(this.doc);
      storage.setLastOpenDocument(this.doc);

      this.savedDocumentTitles = storage.getSavedDocumentTitles();
      this.$refs.output.$refs.feedbackButton.setLabel('Saved!');
    },

    loadSavedDocument(title) {
      if (
        this.doc.saved === false &&
        confirm('The current document has unsaved changes. Discard?') === false
      ) {
        return;
      }

      this.doc = storage.loadDocument(title, this.doc);

      // Replacing this.doc triggers the title and content watchers, which sets saved to false
      // This resets saved to true
      this.$nextTick(() => {
        this.doc.saved = true;
      });
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
