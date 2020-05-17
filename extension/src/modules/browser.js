// @ts-check
import browser from 'webextension-polyfill';

/**
 * Get the currently active tab.
 *
 * @return  {Promise<browser.tabs.Tab>}
 */
export function getActiveTab() {
  return browser.tabs
    .query({ currentWindow: true, active: true })
    .then(tabs => {
      return tabs[0];
    });
}

/**
 * Check if the extension has been granted permission to read
 * and modify pages on the given origins.
 *
 * @param {string[]} origins The origins to check, may include wildcards
 *
 * @return  {Promise<boolean>}
 */
export function hasPermission(...origins) {
  origins = origins.map(origin => {
    return origin.endsWith('/') ? origin + '*' : origin + '/*';
  });

  return browser.permissions.contains({ origins });
}

/**
 * Request permission to read and modify pages on the given origins.
 *
 * @param {string[]} origins The origins to request permission for, may include wildcards
 *
 * @return  {Promise<boolean>}
 */
export function requestPermission(...origins) {
  origins = origins.map(origin => {
    return origin.endsWith('/') ? origin + '*' : origin + '/*';
  });

  return browser.permissions.request({ origins });
}

/**
 * Prompt the user to reload the active tab page to apply content script changes.
 *
 * @param {string} message The prompt message
 */
export function promptForReload(message) {
  browser.tabs.executeScript({
    // JSON.stringify() escapes the message string to avoid self-XSS
    code: `confirm(${JSON.stringify(message)}) && location.reload()`,
  });
}

/**
 * Remove the extension's permission to read and modify pages on the given origins.
 *
 * @param {string[]} origins The origins to remove permission for, may include wildcards
 *
 * @return  {Promise<boolean>}
 */
export function removePermission(...origins) {
  origins = origins.map(origin => {
    return origin.endsWith('/') ? origin + '*' : origin + '/*';
  });

  return browser.permissions.remove({ origins });
}

/**
 * Get the extension's current permissions, including origins.
 *
 * @return  {Promise<browser.permissions.AnyPermissions>}
 */
export function getPermissions() {
  return browser.permissions.getAll();
}
