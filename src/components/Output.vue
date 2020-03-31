<template>
  <div class="noodle-output h-full min-h-0">
    <div
      class="bg-gray-300 border-b border-gray-400 relative z-10 py-4 px-5 md:px-8 w-full"
    >
      <div class="flex max-w-5xl mx-auto">
        <ToggleButtons>
          <ToggleButton id="preview" :value.sync="view">Preview</ToggleButton>
          <ToggleButton id="html" :value.sync="view">HTML</ToggleButton>
        </ToggleButtons>
        <CopyButton class="ml-auto" :content="spaghettified" label="Copy" />
      </div>
    </div>
    <div
      class="py-8 px-5 md:px-8 noodle-output__preview"
      :class="[view === 'preview' ? 'bg-white' : 'bg-gray-100']"
    >
      <div class="max-w-5xl mx-auto">
        <OutputPreview
          :html="html"
          v-show="view === 'preview'"
          @spaghettified="onSpaghettified"
        />
        <OutputHtml :html="spaghettified" v-show="view === 'html'" />
      </div>
    </div>
  </div>
</template>

<script>
import OutputHtml from './OutputHtml.vue';
import OutputPreview from './OutputPreview.vue';
import ToggleButtons from './ToggleButtons.vue';
import ToggleButton from './ToggleButton.vue';
import CopyButton from './CopyButton.vue';

export default {
  name: 'Output',

  components: {
    OutputHtml,
    OutputPreview,
    ToggleButtons,
    ToggleButton,
    CopyButton,
  },

  props: {
    html: String,
    spaghettified: String,
  },

  data() {
    return {
      view: 'preview',
    };
  },

  methods: {
    onSpaghettified(spaghettified) {
      this.$emit('update:spaghettified', spaghettified);
    },
  },
};
</script>

<style>
.noodle-output {
  display: grid;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 1fr;
}

.noodle-output__preview {
  overflow-y: auto;
  overflow-y: overlay;
}
</style>
