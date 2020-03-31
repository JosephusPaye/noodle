<template>
  <pre v-text="html" class="p-4"></pre>
</template>

<script>
export default {
  name: 'OutputHtml',
  props: {
    html: String,
  },
};
</script>
