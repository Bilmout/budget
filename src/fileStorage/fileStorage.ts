import fs from 'fs/promises';
import path from 'path';
import { Storable, StorageAdapter, FileStorageOptions } from './types';

export class FileStorage {
  private dataDir: string;
  private adapter: StorageAdapter<any>;

  constructor(options: FileStorageOptions) {
    this.dataDir = options.dataDir;
    this.adapter = options.adapter;
  }

  async read<T extends Storable>(item: T): Promise<T | T[]> {
    const filePath = this.getFilePath(item);
    return this.adapter.read(filePath);
  }

  async write<T extends Storable>(item: T, data: T | T[]): Promise<void> {
    const filePath = this.getFilePath(item);
    await this.ensureDirectoryExists(path.dirname(filePath));
    await this.adapter.write(filePath, data);
  }

  async append<T extends Storable>(item: T, newData: T): Promise<void> {
    if (item.getStorageType() !== 'collection') {
      throw new Error('Cannot append to a single item storage');
    }
    const existingData = await this.read(item) as T[];
    existingData.push(newData);
    await this.write(item, existingData);
  }

  private getFilePath(item: Storable): string {
    return path.join(this.dataDir, item.getFileName());
  }

  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error;
      }
    }
  }
}
