<template>
  <button
    @click="$emit('click', $event)"
    :class="
      `cursor-pointer shadow rounded-sm px-4 py-1 ${
        color === 'primary'
          ? toggled
            ? 'bg-pink-600 active:bg-pink-600'
            : 'bg-pink-500 active:bg-pink-700'
          : toggled
          ? 'bg-blue-600 text-white active:bg-blue-700'
          : 'bg-white active:bg-gray-200'
      }`
    "
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: String,
    toggled: Boolean,
  },
};
</script>
