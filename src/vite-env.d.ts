
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  analyticsInitialized?: boolean;
}

// Add NetworkInformation type definition
interface NetworkInformation {
  readonly downlink: number;
  readonly effectiveType: string;
  readonly rtt: number;
  readonly saveData: boolean;
  readonly type: string;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

// Extend Navigator interface
interface Navigator {
  readonly connection?: NetworkInformation;
}
