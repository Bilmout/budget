import { Storable } from './fileStorage';

export class User implements Storable {
  constructor(
    public id: string,
    public username: string,
    public email: string
  ) {}

  getStorageKey(): string {
    return 'users';
  }

  getStorageType(): 'single' | 'collection' {
    return 'collection';
  }

  getFileName(): string {
    return 'users.json';
  }
}
