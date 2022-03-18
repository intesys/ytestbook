import { CustomWindow } from "./types";

declare global {
  interface Window {
    db: RxDatabase<
      {
        [key: string]: RxCollection<any, {}, {}, {}>;
      },
      PouchStorageInternals,
      PouchSettings
    >;
  }
}
