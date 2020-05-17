<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="target"
    :class="`button button-color--${color}`"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'Button',
  props: {
    href: String,
    target: String,
    color: {
      type: String,
      default: 'normal', // 'normal', 'primary'
    },
  },
};
</script>

<style scoped>
.button {
  cursor: pointer;
  padding: 8px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  line-height: 1;
  border: none;
  border-radius: 2px;
  font-weight: 500;
  min-width: 72px;
}

.button-color--normal {
  background-color: #eee;
}

.button-color--normal:hover,
.button-color--normal:focus {
  background-color: #ccc;
}

.button-color--normal:active {
  background-color: #aaa;
}

.button-color--primary {
  background-color: #1e88e5;
  color: white;
}

.button-color--primary:hover,
.button-color--primary:focus {
  background-color: #1976d2;
}

.button-color--primary:active {
  background-color: #1565c0;
}
</style>
