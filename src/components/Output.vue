<template>
  <div
    class="noodle-output h-full min-h-0"
    :class="{ 'library-open': showLibrary }"
  >
    <div
      class="bg-gray-300 border-b border-gray-400 relative z-10 py-4 px-5 md:px-8 w-full"
    >
      <div class="flex max-w-5xl mx-auto">
        <ToggleButtons>
          <ToggleButton id="preview" :value.sync="view">Preview</ToggleButton>
          <ToggleButton id="html" :value.sync="view">HTML</ToggleButton>
        </ToggleButtons>
        <CopyButton class="ml-2" :content="spaghettified" label="Copy" />
        <input
          :value="title"
          @input="$emit('update:title', $event.target.value)"
          class="ml-auto w-32 px-3 py-1 bg-gray-500 text-black"
        />
        <FeedbackButton
          ref="feedbackButton"
          label="Save"
          @click="$emit('save')"
        />
        <Button
          class="ml-2"
          :toggled="showLibrary"
          @click="showLibrary = !showLibrary"
          >Library</Button
        >
      </div>
    </div>
    <div v-show="showLibrary">
      <slot name="library"></slot>
    </div>
    <div
      class="py-8 px-5 md:px-8 noodle-output__preview"
      :class="[view === 'preview' ? 'bg-white' : 'bg-gray-100']"
    >
      <div class="max-w-5xl mx-auto">
        <div v-show="view === 'preview'">
          <slot name="preview"></slot>
        </div>
        <pre class="text-sm" v-text="html" v-show="view === 'html'"></pre>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleButtons from './ToggleButtons.vue';
import ToggleButton from './ToggleButton.vue';
import CopyButton from './CopyButton.vue';
import Button from './Button.vue';
import FeedbackButton from './FeedbackButton.vue';

export default {
  name: 'Output',

  components: {
    ToggleButtons,
    ToggleButton,
    CopyButton,
    FeedbackButton,
    Button,
  },

  props: {
    title: String,
    html: String,
    spaghettified: String,
  },

  data() {
    return {
      view: 'preview',
      showLibrary: false,
    };
  },
};
</script>

<style lang="scss">
.noodle-output {
  display: grid;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 1fr;

  &.library-open {
    grid-template-rows: 64px 200px 1fr;
  }
}

.noodle-output__preview {
  overflow-y: auto;
  overflow-y: overlay;
}
</style>
