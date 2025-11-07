import EncryptedStorage from 'react-native-encrypted-storage';

export interface SecureStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

export class SecureStorageAdapter implements SecureStorage {
  async get(key: string){
    try { return await EncryptedStorage.getItem(key); }
    catch { return null; }
  }
  async set(key: string, value: string){
    await EncryptedStorage.setItem(key, value);
  }
  async remove(key: string){
    await EncryptedStorage.removeItem(key);
  }
}
