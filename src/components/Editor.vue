<template>
  <div
    class="flex flex-col border-2 border-transparent bg-white"
    :class="{ 'border-red-300': invalid }"
  >
    <textarea
      autofocus
      class="w-full flex-grow font-mono px-5 py-3 md:px-8 lg:px-5 bg-transparent whitespace-pre-wrap resize-none outline-none"
      :placeholder="placeholder"
      ref="input"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <div class="bg-red-300" v-if="invalid">
      <div class="py-4 px-5" :key="index" v-for="(error, index) in errors">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import sample from '../sample.md';

function createLoadSample(vm) {
  return function() {
    vm.$refs.input.value = sample;
    vm.$refs.input.dispatchEvent(new Event('input', { bubbles: true }));
    return 'Enjoy!';
  };
}

console.info(
  '🍜 Noodle:  Run loadSample() to load a sample markdown file in the editor'
);

export default {
  name: 'Editor',
  props: {
    value: String,
    errors: Array,
  },
  computed: {
    invalid() {
      return this.errors.length > 0;
    },
    placeholder() {
      const messages = [
        'Knock their socks off...',
        'Knock it out of the park...',
        'Blow them away...',
        'Wow them...',
        'Do, or do not. There is not try...',
        'Write something amazing...',
        'Write something awesome...',
        'You got this...',
        'You can do it...',
        'Just do it...',
        "Don't let your dreams be dreams...",
        'Yes you can...',
        'Just write...',
        'A journey of a thousand miles begins with only one step...',
        "If you never try, you'll never know...",
        "You miss 100% of the shots you don't take...",
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.setSelectionRange(0, 0);
    });
    window.loadSample = createLoadSample(this);
  },
  methods: {
    focus() {
      this.$refs.input && this.$refs.input.focus();
    },
  },
};
</script>
