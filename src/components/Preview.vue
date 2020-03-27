<template>
  <div class="h-full overflow-y-auto flex flex-col">
    <div class="flex py-2 px-4 border-b border-gray-300">
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
    <div class="py-3 px-4 flex-grow overflow-y-auto">
      <div v-html="html" v-if="view === 'preview'"></div>
      <pre v-text="html" v-else></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preview',
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
