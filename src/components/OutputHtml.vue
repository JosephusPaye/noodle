<template>
  <pre class="text-sm" v-text="html"></pre>
</template>

<script>
export default {
  name: 'OutputHtml',
  props: {
    html: String,
  },
};
</script>
