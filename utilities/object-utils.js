/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
export function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}
