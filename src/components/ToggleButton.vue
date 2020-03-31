<template>
  <Button
    :color="color"
    :toggled="value === id"
    @click="$emit('update:value', id)"
  >
    <slot></slot>
  </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ToggleButton',
  components: { Button },
  props: {
    id: null,
    value: null,
    color: String,
  },
};
</script>
