import fs from 'fs/promises';
import { StorageAdapter } from '../types';

export class JsonAdapter implements StorageAdapter<any> {
  async read(filePath: string): Promise<any> {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async write(filePath: string, data: any): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }
}
