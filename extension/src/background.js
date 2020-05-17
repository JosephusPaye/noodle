// @ts-check
import browser from 'webextension-polyfill';
import 'content-scripts-register-polyfill';

import { getPermissions } from './modules/browser';
import { log } from './modules/log';

/** @type {Map<string, Promise<any>>} */
const registeredScripts = new Map();

/**
 * Register the content script for the given origins.
 *
 * @param {string[]} origins The origins to register
 *
 * @return {Promise<void>}
 */
async function registerOrigins(origins) {
  log('registering content for origins', origins);

  // Register one at a time to allow removing one at a time as well
  for (const origin of origins || []) {
    const registeredScript = browser.contentScripts
      .register({
        js: [{ file: 'js/content.js' }],
        matches: [origin],
      })
      .catch(error => {
        log('failed to register content script', error);
      });

    // Save a reference to the registered script to remove later
    registeredScripts.set(origin, registeredScript);
  }
}

browser.permissions.onAdded.addListener(function(permissions) {
  log('permissions added, examining origins to register content script');
  if (permissions.origins && permissions.origins.length > 0) {
    log(
      'new origins permitted, registering content script',
      permissions.origins
    );
    registerOrigins(permissions.origins);
  }
});

browser.permissions.onRemoved.addListener(async function(permissions) {
  log('permissions removed, examining origins to register content script');

  if (!permissions.origins || permissions.origins.length === 0) {
    log('no origins removed, doing nothing');
    return;
  }

  log(
    'origins removed, unregistering associated content scripts',
    permissions.origins
  );

  for (const [origin, script] of registeredScripts.entries()) {
    if (permissions.origins.includes(origin)) {
      log('unregistering script for origin', origin);
      (await script).unregister();
    }
  }
});

async function main() {
  log('background script booted, registering content scripts');
  const permissions = await getPermissions();
  log('current permitted origins', permissions);
  await registerOrigins(permissions.origins);
}

main();
