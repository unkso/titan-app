/**
 * Loads the data associated with the given storage key.
 *
 * @param {string} storageKey - The unique ID used when initially storing
 *                              the data.
 * @returns {*}
 */
export function load (storageKey) {
  try {
    const data = localStorage.getItem(storageKey)

    return (data !== null) ? JSON.parse(data) : undefined
  } catch (error) {
    return undefined
  }
}

/**
 * Saves data to local storage by a given key.
 *
 * @param {string} storageKey - A unique ID to associate the data to.
 * @param {*} data - The data to save.
 */
export function save (storageKey, data) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data))
  } catch (error) {
    // Local storage is not available.
  }
}

export default {
  save: save,
  load: load
}
