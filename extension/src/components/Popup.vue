<template>
  <div id="app">
    <template v-if="showAbout">
      <div>
        <div class="credits-title">Noodle Markdown Editor for Blackboard™</div>
        <div class="credits">
          <p>
            Created by
            <a
              href="https://twitter.com/JosephusPaye"
              target="_blank"
              rel="noopener"
              >Josephus Paye II</a
            >
            <br />for
            <a
              href="https://twitter.com/JosephusPaye/status/1214853295023411200"
              target="_blank"
              rel="noopener"
              >#CreateWeekly</a
            >.
          </p>
          Open sourced on
          <a
            href="https://github.com/JosephusPaye/noodle/extension"
            target="_blank"
            rel="noopener"
            >Github</a
          >.
        </div>
      </div>

      <div class="navigation">
        <a @click.prevent="showAbout = false">Back</a>
      </div>
    </template>

    <template v-else>
      <div v-if="state === 'loading'">Loading...</div>

      <div v-else-if="state === 'not-applicable'" class="title">
        Noodle cannot be enabled on this page.
      </div>

      <div v-else-if="state === 'not-enabled'">
        <div class="title">Noodle is not enabled</div>
        <Button color="primary" @click.native="enableForDomain"
          >Enable on this domain</Button
        >
      </div>

      <div v-else-if="state === 'enabled'">
        <div class="title">Noodle is enabled</div>
        <Button color="primary" @click.native="disableForDomain"
          >Disable on this domain</Button
        >
      </div>

      <div class="navigation">
        <a @click.prevent="showAbout = true">About</a>
      </div>
    </template>
  </div>
</template>

<script>
// @ts-check
import Button from './Button.vue';

import {
  getActiveTab,
  hasPermission,
  requestPermission,
  removePermission,
  promptForReload,
} from '../modules/browser';

export default {
  name: 'app',

  components: { Button },

  data() {
    return {
      showAbout: false,
      state: 'loading',
      origin: '',
    };
  },

  async created() {
    const tab = await getActiveTab();
    const url = new URL(tab.url);

    if (
      url.protocol.includes('chrome') ||
      url.href.startsWith('https://chrome.google.com/webstore')
    ) {
      this.state = 'not-applicable';
      return;
    }

    this.origin = url.origin;

    const doesHavePermission = await hasPermission(url.origin);

    if (!doesHavePermission) {
      this.state = 'not-enabled';
    } else {
      this.state = 'enabled';
    }
  },

  methods: {
    async enableForDomain() {
      const granted = await requestPermission(this.origin);

      if (granted) {
        this.state = 'enabled';
        promptForReload('Reload this page to add the Noodle editor?');
      }
    },

    async disableForDomain() {
      const removed = await removePermission(this.origin);

      if (removed) {
        this.state = 'not-enabled';
        promptForReload('Reload this page to remove the Noodle editor?');
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
  padding: 0;
}

#app {
  min-width: 280px;
  padding: 24px;
  padding-bottom: 16px;
  text-align: center;
}

.title {
  font-size: 20px;
  line-height: 1;
  margin-top: -6px;
  margin-bottom: 12px;
}

.credits-title {
  font-weight: 600;
  font-size: 18px;
}

.navigation {
  border-top: 1px solid #eee;
  padding-top: 4px;
  margin-top: 20px;
  display: block;
}

.navigation a {
  display: inline-block;
  margin-top: 4px;
  margin-bottom: -6px;
  cursor: pointer;
  color: #1976d2;
  font-size: 14px;
}
</style>
