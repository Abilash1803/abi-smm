/**
 * Local Storage Utility Functions
 * Provides safe and consistent access to browser localStorage
 * 
 * BACKEND INTEGRATION POINTS:
 * - Token management: Store and retrieve authentication tokens
 * - User data caching: Cache user profile and preferences
 * - Session management: Handle user sessions and auto-logout
 * - Analytics: Track user behavior and preferences locally
 */

/**
 * Safely get item from localStorage
 * @param {string} key - The key to retrieve
 * @returns {any} - Parsed value or null if not found/invalid
 */
export const getFromStorage = (key) => {
  try {
    if (typeof window === 'undefined') return null;
    
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    // Try to parse as JSON, fallback to string
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.error(`Error getting item from localStorage:`, error);
    return null;
  }
};

/**
 * Safely set item in localStorage
 * @param {string} key - The key to set
 * @param {any} value - The value to store
 * @returns {boolean} - Success status
 */
export const setToStorage = (key, value) => {
  try {
    if (typeof window === 'undefined') return false;
    
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error setting item to localStorage:`, error);
    return false;
  }
};

/**
 * Safely remove item from localStorage
 * @param {string} key - The key to remove
 * @returns {boolean} - Success status
 */
export const removeFromStorage = (key) => {
  try {
    if (typeof window === 'undefined') return false;
    
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item from localStorage:`, error);
    return false;
  }
};

/**
 * Clear all items from localStorage
 * @returns {boolean} - Success status
 */
export const clearStorage = () => {
  try {
    if (typeof window === 'undefined') return false;
    
    localStorage.clear();
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage:`, error);
    return false;
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} - Availability status
 */
export const isStorageAvailable = () => {
  try {
    if (typeof window === 'undefined') return false;
    
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get all keys from localStorage
 * @returns {string[]} - Array of all keys
 */
export const getAllStorageKeys = () => {
  try {
    if (typeof window === 'undefined') return [];
    
    return Object.keys(localStorage);
  } catch (error) {
    console.error(`Error getting localStorage keys:`, error);
    return [];
  }
};

/**
 * Get storage usage information
 * @returns {object} - Storage usage stats
 */
export const getStorageInfo = () => {
  try {
    if (typeof window === 'undefined') return { used: 0, available: 0 };
    
    let used = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    
    // Rough estimate of available space (5MB typical limit)
    const available = 5 * 1024 * 1024 - used;
    
    return {
      used: used,
      available: Math.max(0, available),
      usedMB: (used / (1024 * 1024)).toFixed(2),
      availableMB: Math.max(0, available / (1024 * 1024)).toFixed(2)
    };
  } catch (error) {
    console.error(`Error getting storage info:`, error);
    return { used: 0, available: 0 };
  }
};