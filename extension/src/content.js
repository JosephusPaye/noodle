// @ts-check
import Vue from 'vue/dist/vue.esm.browser';

import { log } from './modules/log';
import { integration as blackboard } from './integrations/blackboard';

import EmbeddedEditorOptions from './components/EmbeddedEditor.vue';
const EmbeddedEditor = Vue.extend(EmbeddedEditorOptions);

/**
 * @typedef {import('./integrations/blackboard').Integration} Integration
 */

/**
 * @param {string} selector
 * @param {{ (target: Element, integration: Integration): void }} callback
 * @param {Integration} callbackArgs
 */
function waitForElement(selector, callback, callbackArgs) {
  const element = document.querySelector(selector);

  if (element) {
    callback(element, callbackArgs);
    return;
  }

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      const nodes = Array.from(mutation.addedNodes);
      for (const node of nodes) {
        if (node instanceof Element && node.matches(selector)) {
          callback(node, callbackArgs);
        }
      }
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

let nextEditorIndex = 0;
function getEditorId() {
  return `noodle-editor-${nextEditorIndex++}`;
}

const noodleEditors = {};
window.noodleEditors = noodleEditors;

/**
 * @param {Element} target
 * @param {Integration} integration
 */
function onTargetElement(target, integration) {
  log('got target element: ', target);

  const editorId = getEditorId();
  log('creating editor', editorId);

  const [
    activationButtonWrapper,
    activationButton,
  ] = integration.createActivationButton(
    '🍜 Noodle Editor',
    "Switch to Noodle's Markdown editor",
    editorId,
    e => {
      log('activation button clicked', e);

      const editor = noodleEditors[editorId];
      if (!editor) {
        log('editor not found', editorId, noodleEditors);
        return;
      }

      editor.replaced =
        editor.replaced ||
        integration.elementToReplace(editor.target, document);

      if (editor.replaced) {
        log('replacing element', editor.replaced);

        if (!editor.vueRoot) {
          createEditor(editor, integration);
        } else {
          destroyEditor(editor);
        }
      } else {
        log("element to replaced with Noodle's editor not found");
      }
    }
  );

  activationButton.dataset.noodle = editorId;
  noodleEditors[editorId] = {
    id: editorId,
    activationButton,
    target,
    committed: false,
  };

  const referenceButton = integration.insertActivationButtonBefore(
    target,
    document
  );

  if (referenceButton) {
    const inserted = referenceButton.parentElement.insertBefore(
      activationButtonWrapper,
      referenceButton
    );
    log('inserted activation button', inserted);
  } else {
    log(
      "unable to find reference element to insert Noodle's activation button"
    );
  }
}

function createEditor(editor, integration) {
  const rootEl = document.createElement('div');
  rootEl.classList.add('noodle-editor-root');

  const inserted = editor.replaced.parentElement.insertBefore(
    rootEl,
    editor.replaced
  );

  if (inserted) {
    const vueRoot = new EmbeddedEditor({
      propsData: {
        html: integration.getInitialValue(editor.target, document),
        actionButtonLabel: 'Done',
        onAction: () => {
          commitEditor(editor, integration);
          destroyEditor(editor);
        },
        discardButtonLabel: 'Cancel',
        onDiscard: () => {
          if (confirm('Discard all changes?')) {
            destroyEditor(editor);
          }
        },
      },
    });

    editor.replaced.dataset.noodleHidden = true;
    editor.replaced.dataset.noodleOriginalDisplay = editor.replaced
      .computedStyleMap()
      .get('display').value;
    editor.replaced.style.display = 'none';

    editor.vueRoot = vueRoot;
    editor.committed = false;

    vueRoot.$mount(rootEl);
  }
}

function destroyEditor(editor) {
  const rootEl = editor.vueRoot.$el;

  editor.vueRoot.$destroy();
  rootEl.remove();

  delete editor.replaced.dataset.noodleHidden;
  editor.replaced.style.display = editor.replaced.dataset.noodleOriginalDisplay;

  delete editor.vueRoot;
}

function commitEditor(editor, integration) {
  integration.commitInput(
    editor.vueRoot.input,
    editor.vueRoot.output,
    editor.target,
    document
  );
  editor.committed = true;
}

waitForElement(blackboard.targetElement, onTargetElement, blackboard);
