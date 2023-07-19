export type IStorageWrite = (key: string, value: any) => void;

export type IStorageRead = <T>(key: string) => T | null;

export type IStorageRemove = (key: string) => void;

export type IStorageClear = () => void;

export interface IStorage {
  write: IStorageWrite;
  read: IStorageRead;
  remove: IStorageRemove;
  clear: IStorageClear;
}
