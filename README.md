# Noodle

🍝 Markdown to spaghettified HTML. By spaghettified I mean HTML with all styles embedded inline. Useful for pasting in emails and online text inputs that accept HTML.

[![Promotional image show Noodle editor, preview, and output](./promo.png)](https://noodle-editor.netlify.com/)

This project is part of [#CreateWeekly](https://dev.to/josephuspaye/createweekly-create-something-new-publicly-every-week-in-2020-1nh9), my attempt to create something new publicly every week in 2020.

## Usage

<https://noodle-editor.netlify.com/>

## Features

Noodle allows you to:

- Write Markdown with support for code syntax highlighting for common languages
- Compile your Markdown to HTML with inline styles, and copy the result to clipboard

The editor automatically saves your input locally to prevent data loss if you accidentally close the page.

This README was written in Noodle 🙈.

## How it works

- Noodle compiles your Markdown to HTML using [markdown-it](https://github.com/markdown-it/markdown-it). As a part of this compilation, code blocks are highlighted with [highlight.js](https://highlightjs.org/).
- The resulting HTML is inserted into an isolated shadow DOM for rendering with the Markdown stylesheet (adapted from Github's default Markdown styles).
- The rendered HTML is cloned and spaghettified, by walking the DOM tree and looking up matching CSS rules for each element from the Markdown stylesheet. Matching rules are then applied to the element as inline styles.
- Finally the spaghettified DOM tree is serialized to HTML.

## Contributing

See [contribution guide](CONTRIBUTING.md).

## Licence

[MIT](LICENCE)
