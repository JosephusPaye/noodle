<template>
  <div class="flex mb-2 bg-gray-800 h-full items-start">
    <div
      class="p-3 pr-0 w-24 inline-flex items-center cursor-default text-gray-400"
    >
      Library
    </div>
    <div class="ml-2 p-3 pl-0 flex-grow flex overflow-y-auto h-full">
      <button
        class="px-3 h-8 inline-flex flex-shrink-0 items-center justify-center capitalize cursor-pointer mr-1"
        :class="
          currentDocument === doc ? 'bg-blue-400' : 'bg-gray-700 text-gray-300'
        "
        v-for="doc in documents"
        :key="doc"
        @click="$emit('select', doc)"
      >
        {{ doc }}
      </button>
      <div class="text-gray-500 italic" v-if="documents.length === 0">
        No saved documents. Save documents to see them here.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'document-library',
  props: {
    currentDocument: String,
    documents: Array,
  },
};
</script>
