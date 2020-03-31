<template>
  <div class="h-full overflow-y-auto flex flex-col bg-gray-800 py-4 px-6">
    <div class="flex mb-4">
      <button
        class="px-4 py-1"
        :class="[view === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-300']"
        @click="view = 'preview'"
      >
        Preview
      </button>
      <button
        class="px-4 py-1"
        :class="[view === 'html' ? 'bg-blue-600 text-white' : 'bg-gray-300']"
        @click="view = 'html'"
      >
        HTML
      </button>
    </div>
    <div class="bg-white flex-grow overflow-y-auto">
      <OutputPreview :html="html" v-if="view === 'preview'" />
      <OutputHtml :html="html" v-else />
    </div>
  </div>
</template>

<script>
import OutputHtml from './OutputHtml.vue';
import OutputPreview from './OutputPreview.vue';

export default {
  name: 'Output',
  components: {
    OutputHtml,
    OutputPreview,
  },
  props: {
    html: String,
  },
  data() {
    return {
      view: 'preview',
    };
  },
};
</script>
