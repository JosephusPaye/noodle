import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  // typographer: true,
});

export function compile(input) {
  return md.render(input);
}
