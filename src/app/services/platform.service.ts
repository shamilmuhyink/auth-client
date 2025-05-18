import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private isBrowser: boolean;
  private isServer: boolean;
  private serverStorage: Map<string, string> = new Map();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);
  }

  setLocalStorageItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    } else if (this.isServer) {
      this.serverStorage.set(key, value);
    }
  }

  getLocalStorageItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    } else if (this.isServer) {
      return this.serverStorage.get(key) || null;
    }
    return null;
  }

  removeLocalStorageItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    } else if (this.isServer) {
      this.serverStorage.delete(key);
    }
  }

  clearLocalStorage(): void {
    if (this.isBrowser) {
      localStorage.clear();
    } else if (this.isServer) {
      this.serverStorage.clear();
    }
  }
  
  // Check if we're running on server
  isServerPlatform(): boolean {
    return this.isServer;
  }
  
  // Check if we're running in browser
  isBrowserPlatform(): boolean {
    return this.isBrowser;
  }
}