# Noodle the library

Noodle the library provides a set of Vue components that can be used to integrate Noodle into a Vue app.

- See the [main README](https://github.com/JosephusPaye/noodle) for an introduction to Noodle and how it works.
- See <https://noodle-editor.netlify.com/> for an online demo.

## Installation

```sh
npm install @josephuspaye/noodle --save
```

## Usage

```vue
<template>
  <div id="app">
    <Noodle
      :input="input"
      v-slot="{ output, errors, previewAttrs, previewEvents }"
    >
      <textarea
        rows="10"
        placeholder="Write some Markdown..."
        v-model="input"
      ></textarea>

      <div
        v-if="errors.length > 0"
        style="backgroun-color: red; color: white; padding: 8px"
      >
        <div :key="index" v-for="(error, index) in errors">{{ error }}</div>
      </div>

      <div style="border: 2px solid gray; padding: 16px">
        <NoodlePreview v-bind="previewAttrs" v-on="previewEvents" />
      </div>
    </Noodle>
  </div>
</template>

<script>
import { Noodle, NoodlePreview } from '@josephuspaye/noodle';

export default {
  name: 'App',

  components: {
    Noodle,
    NoodlePreview,
  },

  data() {
    return {
      input: '# Oh hai',
    };
  },
};
</script>
```

## API

## Licence

[MIT](https://github.com/JosephusPaye/noodle/blob/master/LICENCE)
