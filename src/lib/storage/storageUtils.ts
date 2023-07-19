import {
  IStorageWrite,
  IStorageRead,
  IStorageRemove,
  IStorageClear,
  IStorage,
} from "./types";
import { STORAGE_NOT_AVAILABLE } from "./consts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const write =
  (storage?: Storage): IStorageWrite =>
  (key, value) => {
    if (!storage) {
      console.warn(STORAGE_NOT_AVAILABLE);
      return;
    }
    try {
      const _value = JSON.stringify(value);
      storage.setItem(key, _value);
    } catch {
      console.log(`Can't write in storage`);
    }
  };

const read =
  (storage?: Storage): IStorageRead =>
  <T>(key: string): T | null => {
    if (!storage) {
      console.warn(STORAGE_NOT_AVAILABLE);
      return null;
    }
    const value = storage.getItem(key);
    try {
      if (value) {
        return JSON.parse(value) as T;
      }
      return value as unknown as T;
    } catch {
      return value as unknown as T;
    }
  };

const remove =
  (storage: Storage): IStorageRemove =>
  (key) => {
    if (!storage) {
      console.warn(STORAGE_NOT_AVAILABLE);
      return;
    }
    storage.removeItem(key);
  };

const clear =
  (storage: Storage): IStorageClear =>
  () => {
    if (!storage) {
      console.warn(STORAGE_NOT_AVAILABLE);
      return;
    }
    storage.clear();
  };

export const LocalStorage: IStorage = {
  write: write(window.localStorage),
  read: read(window.localStorage),
  remove: remove(window.localStorage),
  clear: clear(window.localStorage),
};

export const SessionStorage = {
  write: write(window.sessionStorage),
  read: read(window.sessionStorage),
  remove: remove(window.sessionStorage),
  clear: clear(window.sessionStorage),
};
