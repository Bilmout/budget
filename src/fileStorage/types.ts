export interface Storable {
    getStorageKey(): string;
    getStorageType(): 'single' | 'collection';
    getFileName(): string;
  }
  
export interface StorageAdapter<T> {
    read(filePath: string): Promise<T>;
    write(filePath: string, data: T): Promise<void>;
  }
  
export interface FileStorageOptions {
    dataDir: string;
    adapter: StorageAdapter<any>;
  }
  