import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

import { getMatchedCSSRules } from './css';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  // typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  },
});

export function compile(input) {
  return md.render(input);
}

function cssRulesToStyleMap(cssRules) {
  const styles = new Map();

  // The rules are in order of specificity, from greatest to least, so iterate in reverse order
  for (let i = cssRules.length - 1; i > -1; i--) {
    const rule = cssRules[i];

    for (let j = 0; j < rule.style.length; j++) {
      const property = rule.style[j];
      const value = (rule.style[property] || '').replace('!important', '');
      styles.set(property, value);
    }
  }

  return styles;
}

function addInlineStyles(element, styleMap) {
  for (const [key, value] of styleMap.entries()) {
    element.style[key] = value;
  }
}

export function spaghettify(element, styleSheets) {
  if (element.nodeType === Node.ELEMENT_NODE) {
    const rules = getMatchedCSSRules(element, styleSheets);
    const styleMap = cssRulesToStyleMap(rules);
    addInlineStyles(element, styleMap);
  }

  Array.from(element.childNodes).map(child => {
    return spaghettify(child, styleSheets);
  });
}
