<template>
  <div class="noodle-embedded-editor">
    <div class="editor-header">
      <button
        class="tab-button"
        @click.stop.prevent="view = 'write'"
        :class="{ selected: view === 'write' }"
      >
        Write
      </button>
      <button
        class="tab-button"
        @click.stop.prevent="view = 'preview'"
        :class="{ selected: view === 'preview' }"
      >
        Preview
      </button>
      <a
        href="https://www.markdownguide.org/cheat-sheet/"
        target="_blank"
        rel="noopener"
        title="Markdown quick reference"
        class="help-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="18px"
          height="18px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
          />
        </svg>
      </a>
    </div>

    <Noodle :input="input" v-slot="{ output, errors, previewAttrs }">
      <div class="editor-body">
        <div v-show="view === 'write'">
          <textarea
            class="editor-input"
            rows="10"
            :placeholder="placeholder"
            ref="input"
            v-model="input"
          ></textarea>

          <div
            class="editor-actions"
            v-if="
              (actionButtonLabel && onAction) ||
                (discardButtonLabel && onDiscard)
            "
          >
            <button
              class="action-button primary"
              @click.stop.prevent="onAction"
              v-if="actionButtonLabel && onAction"
            >
              {{ actionButtonLabel }}
            </button>

            <button
              class="action-button align-right"
              @click.stop.prevent="onDiscard"
              v-if="discardButtonLabel && onDiscard"
            >
              {{ discardButtonLabel }}
            </button>
          </div>
        </div>

        <div
          v-show="view === 'preview'"
          class="editor-preview"
          @click.stop.prevent
        >
          <NoodlePreview
            v-bind="previewAttrs"
            @spaghettified="onSpaghettified"
          />
        </div>
      </div>
    </Noodle>
  </div>
</template>

<script>
import n from '@josephuspaye/noodle';
import TurndownService from 'turndown/lib/turndown.es.js';
import { strikethrough, tables } from 'turndown-plugin-gfm';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  fence: '```',
});

turndownService.use(strikethrough);
turndownService.use(tables);

turndownService.keep(['kbd', 'sup', 'sub', 'svg', 'iframe']);

export default {
  name: 'App',

  components: {
    Noodle: n.Noodle,
    NoodlePreview: n.NoodlePreview,
  },

  props: {
    actionButtonLabel: String,
    onAction: Function,
    discardButtonLabel: String,
    onDiscard: Function,
    html: String,
    markdown: String,
  },

  data() {
    return {
      input: this.getDefaultInput(),
      view: 'write',
      output: '',
    };
  },

  computed: {
    placeholder() {
      const messages = [
        'Knock their socks off...',
        'Knock it out of the park...',
        'Blow them away...',
        'Write something amazing...',
        'Write something awesome...',
        'You got this...',
        'You can do it...',
        'Just do it...',
        'Yes you can...',
        'Just write...',
        '"Do, or do not. There is no try." - Yoda..',
        '"Smile, breathe, and go slowly." - Thich Nhat Hanh',
        '"Well begun is half done." - Aristotle',
        '"It is quality rather than quantity that matters." - Lucius Annaeus Seneca',
        '"Genius is one percent inspiration and ninety-nine percent perspiration." - Thomas Edison',
        '"It always seems impossible until it is done." - Nelson Mandela',
        '"Every moment is a fresh beginning." - T.S. Eliot',
        '"Begin at the beginning... and go on till you come to the end: then stop." - Lewis Carroll',
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    },
  },

  watch: {
    view(newView) {
      if (newView === 'write') {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },

    markdown(markdown) {
      if (markdown && markdown.trim().length > 0) {
        this.input = markdown;
      }
    },

    html(html) {
      if (html && html.trim().length > 0) {
        this.input = turndownService.turndown(html);
      }
    },
  },

  mounted() {
    this.$refs.input.focus();
  },

  methods: {
    getDefaultInput() {
      if (this.markdown && this.markdown.trim().length > 0) {
        return this.markdown;
      }

      if (this.html && this.html.trim().length > 0) {
        return turndownService.turndown(this.html);
      }

      return '';
    },

    focus() {
      this.view = 'write';
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    onSpaghettified(spaghettified) {
      this.output = spaghettified;
    },
  },
};
</script>

<style scoped>
.noodle-embedded-editor,
.noodle-embedded-editor * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.noodle-embedded-editor {
  color: rgba(0, 0, 0, 0.87);
  font-size: 1rem;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
}

.editor-header {
  background-color: #eee;
  padding: 8px 12px;
  padding-bottom: 0;
  display: flex;
  align-items: center;
}

.tab-button {
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 2px solid transparent;
  font-size: 14px;
  border-radius: 3px 3px 0 0;
  padding: 8px 16px;
  margin-bottom: -2px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
}

.tab-button:hover,
.tab-button:focus {
  color: rgba(0, 0, 0, 0.87);
}

.tab-button.selected {
  border: 1px solid #ccc;
  border-bottom: 2px solid white !important;
  background-color: white;
  color: rgba(0, 0, 0, 0.87);
}

.help-button {
  color: rgba(0, 0, 0, 0.54);
  margin-left: auto;
}

.help-button:hover,
.help-button:focus {
  color: rgba(0, 0, 0, 0.87);
}

.editor-body {
  border-top: 1px solid #ccc;
  padding: 12px;
  background-color: white;
}

.editor-input {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 2px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 0;
}

.editor-input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

textarea.editor-input {
  overflow: auto;
  resize: vertical;
}

.editor-actions {
  margin-top: 8px;
  display: flex;
}

.action-button {
  cursor: pointer;
  padding: 0 16px;
  padding-bottom: 1px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  border: none;
  border-radius: 2px;
  font-weight: 500;
  background-color: #eee;
}

.action-button:hover,
.action-button:focus {
  background-color: #ddd;
}

.action-button:active {
  background-color: #ccc;
}

.action-button.primary {
  background-color: #1e88e5;
  color: white;
  min-width: 72px;
}

.action-button.primary:hover,
.action-button.primary:focus {
  background-color: #1976d2;
}

.action-button.primary:active {
  background-color: #1565c0;
}

.action-button.align-right {
  margin-left: auto;
}

.editor-preview {
  padding: 4px 12px;
  overflow-y: auto;
  max-height: 720px;
}
</style>
