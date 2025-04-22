
/**
 * A utility for interacting with localStorage with error handling
 */
export const storage = {
  /**
   * Retrieves an item from localStorage and parses it from JSON
   * @param key The key to retrieve
   * @returns The parsed value or null if not found
   */
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  /**
   * Stores an item in localStorage after stringifying it to JSON
   * @param key The key to store under
   * @param value The value to store
   */
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  /**
   * Removes an item from localStorage
   * @param key The key to remove
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  /**
   * Clears all items from localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  /**
   * Retrieves all keys from localStorage
   * @returns Array of keys
   */
  keys: (): string[] => {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  }
};
