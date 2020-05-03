# Noodle the library

Noodle the library provides a set of Vue components for integrating Noodle into a Vue app.

- See the [README](https://github.com/JosephusPaye/noodle) for an introduction to Noodle and how it works.
- See <https://noodle-editor.netlify.com> for an online demo.

## Installation

```sh
npm install @josephuspaye/noodle --save
```

## Example

This example shows how to use the [`Noodle`](#Noodle) and [`NoodlePreview`](#NoodlePreview) components to create a basic editor and preview.

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

### Noodle

The `Noodle` component is a [renderless component](https://adamwathan.me/renderless-components-in-vuejs/) that allows you to use a custom UI for the editor and preview. You render the component and use props from the default scoped slot, which can be used to render your editor and preview UI in the slot. See the [Example](#example) section above for an example.

#### Props

| Prop              | Type   | Presense | Description                                                                                       |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------------- |
| `input`           | String | Required | The input Markdown string to compile.                                                             |
| `debounceTimeout` | Number | Optional | The number of milliseconds to wait between `input` changes before recompiling. Defaults to `250`. |

#### Scoped Slot Props

| Prop            | Type     | Description                                                                                                         |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `output`        | String   | The spaghettified HTML string.                                                                                      |
| `errors`        | String[] | Array of Markdown compilation errors.                                                                               |
| `previewAttrs`  | Object   | Attributes (props) to apply to the `NoodlePreview` component. Sets the `html` prop on `NoodlePreview`.              |
| `previewEvents` | Object   | Event listeners to apply to the `NoodlePreview` component. Listens to the `spaghettified` event on `NoodlePreview`. |

### NoodlePreview

The `NoodlePreview` component renders the compiled Markdown and computes the styles required to produce the spaghettified HTML. As a result, it is required when using the `Noodle` component. If you want a custom preview, you can hide the `NoodlePreview` component by setting the `hidden` prop and rendering your own preview using the .

#### Props

| Prop     | Type    | Presense | Description                                          |
| -------- | ------- | -------- | ---------------------------------------------------- |
| `html`   | String  | Required | The compiled HTML string from `Noodle`.              |
| `hidden` | Boolean | Optional | When `true`, hides the preview. Defaults to `false`. |

#### Events

| Event           | Description                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `spaghettified` | Emitted when the spaghettified HTML is computed. The handler is called with the spaghettified HTML string. |

When using `NoodlePreview` with `Noodle`, the required props and event listeners should be set using the `previewAttrs` and `previewEvents` props from the default scoped slot, like so:

```vue
<Noodle :input="input" v-slot="{ previewAttrs, previewEvents }">
  <NoodlePreview v-bind="previewAttrs" v-on="previewEvents" />
</Noodle>
```

See the [Example](#example) section above for a complete example.

## Licence

[MIT](https://github.com/JosephusPaye/noodle/blob/master/LICENCE)
