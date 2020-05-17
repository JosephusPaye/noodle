// @ts-check

/**
 * @typedef {Object} Integration
 * @property {string} targetElement
 * @property {(target: Element, document: Document) => Element} elementToReplace
 * @property {(target: Element, document: Document) => Element} insertActivationButtonBefore
 * @property { (text: string, title: string, editorId: string, onClick?: (this: GlobalEventHandlers, ev: MouseEvent) => any) => HTMLElement[] } createActivationButton
 * @property {(target: Element, document: Document) => string} getInitialValue
 * @property {(input: string, compiled: string, target: Element, document: Document) => void} commitInput
 * @property {(target: Element, document: Document) => Element[]} confirmOnClick
 */

/** @type Integration */
export const integration = {
  targetElement: '.mceEditor',
  elementToReplace,
  insertActivationButtonBefore,
  createActivationButton,
  getInitialValue,
  commitInput,
  confirmOnClick,
};

/**
 * @param {HTMLElement} target
 * @param {Document} document
 */
function elementToReplace(target, document) {
  return target.closest('table.textboxtable');
}

/**
 * @param {HTMLElement} target
 * @param {Document} document
 */
function insertActivationButtonBefore(target, document) {
  return target.querySelector('.mceToolbarRow5 .mceToolbarStartButton + td');
}

/**
 * TODO: Finish integrating this into content.js - the elements returned
 * from this function should be watched for clicks, when that happens,
 * the extension should check if there are any uncommitted editors,
 * if there are - prompt the user to commit before continuing.
 *
 * @param {HTMLElement} target
 * @param {Document} document
 */
function confirmOnClick(target, document) {
  return findClosestSiblings(
    'input[type="submit"], button[type="submit"',
    target
  );
}

/**
 * @param {string} text
 * @param {string} title
 * @param {string} editorId
 * @param {(this: GlobalEventHandlers, ev: MouseEvent) => any} [onClick]
 * @return {HTMLElement[]}
 */
function createActivationButton(text, title, editorId, onClick) {
  const button = document.createElement('a');

  button.classList.add('mceButton');
  button.classList.add('mceButtonEnabled');

  button.setAttribute('role', 'button');
  button.setAttribute('href', 'javascript:;');
  button.setAttribute('title', title);

  button.style.cssText = `
    width: 120px;
    height: 25px;
    padding-top: 4px;
    box-sizing: border-box;
    text-align: center;
    background-color: #1E88E5;
    color: white;
    border: none;
  `;

  button.innerText = text;
  button.onclick = onClick;

  button.dataset.noodle = editorId;

  const td = document.createElement('td');
  td.style.position = 'relative';
  td.appendChild(button);

  return [td, button];
}

/**
 * @param {string} input
 * @param {string} compiled
 * @param {HTMLElement} target
 * @param {Document} document
 */
function commitInput(input, compiled, target, document) {
  const iframe = target.querySelector('iframe');
  if (iframe) {
    // Update TinyMCE
    const innerDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    innerDocument.body.innerHTML = compiled;

    // Update the hidden input submitted by TinyMCE
    const targetId = target.getAttribute('id');
    if (targetId && targetId.endsWith('_parent')) {
      const hiddenInput = target.parentElement.querySelector(
        `[name="${targetId.replace('_parent', '')}"]`
      );

      if (hiddenInput) {
        hiddenInput.value = compiled;
      }
    }
  }
}

/**
 * @param {HTMLElement} target
 * @param {Document} document
 */
function getInitialValue(target, document) {
  const iframe = target.querySelector('iframe');

  if (iframe) {
    const innerDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    return innerDocument.body.innerHTML;
  }

  return '';
}

/**
 * @param {string} selector
 * @param {Element} currentEl
 * @return {Element[]}
 */
function findClosestSiblings(selector, currentEl) {
  const matching = Array.from(currentEl.querySelectorAll(selector));

  if (matching.length > 0) {
    return matching;
  } else if (currentEl.parentElement) {
    return findClosestSiblings(selector, currentEl.parentElement);
  } else {
    return [];
  }
}
