<template>
  <div class="flex noodle-toggle-buttons">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ToggleButtons',
};
</script>

<style>
.noodle-toggle-buttons button:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.noodle-toggle-buttons button:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
