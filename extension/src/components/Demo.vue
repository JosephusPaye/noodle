<template>
  <div id="app">
    <EmbeddedEditor
      actionButtonLabel="Done"
      :onAction="onAction"
      discardButtonLabel="Discard"
      :onDiscard="onDiscard"
    />
  </div>
</template>

<script>
import EmbeddedEditor from './EmbeddedEditor.vue';

export default {
  name: 'demo',

  components: { EmbeddedEditor },

  methods: {
    onAction(e) {
      alert('Save input');
    },

    onDiscard(e) {
      alert('Discard input');
    },
  },
};
</script>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

body {
  color: rgba(0, 0, 0, 0.87);
  background-color: #eee;
  font-size: 1rem;
}

#app {
  max-width: 600px;
  margin: 40px auto;
}
</style>
