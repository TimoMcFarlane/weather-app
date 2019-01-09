import {AsyncStorage} from 'react-native';

export const load = (key) => {
  fetchFromStorage = (resolve, reject) => {
    try {
      const value = AsyncStorage.getItem(key)
      resolve(value);
    } catch (error) {
      reject("An error occured while fetching data..");
    }
  };
  return new Promise(fetchFromStorage);
};

export const save = (key, value) => {
  saveToStorage = (resolve, reject) => {
    try {
      AsyncStorage.setItem(`${key}`, JSON.stringify(value))
      resolve("Item saved");
    } catch (error) {
      reject("An error occured while saving to storage..");
    }
  };
  return new Promise(saveToStorage);
};

export const clear = () => {
  clearStorage = (resolve, reject) => {
    try {
      AsyncStorage.clear();
      resolve("Storage cleared");
    } catch (error) {
      reject("An error occured while clearing storage");
    }
  };

  return new Promise(clearStorage);
};

export const getKeys = () => {
  getKeysFromStorage = (resolve, reject) => {
    try {
      let value = AsyncStorage.getAllKeys();
      resolve(value);
    } catch (error) {
      reject("An error occured while fetching all keys from storage");
    }
  };

  return new Promise(getKeysFromStorage);
};

export const getAll = (keys) => {
  getAllFromStorage = (resolve, reject) => {
    try {
      const items = AsyncStorage.multiGet(keys);
      resolve(items)
    } catch (error) {
      reject("An error occured while fetching all items from storage..");
    }
  };

  return new Promise(getAllFromStorage);
}