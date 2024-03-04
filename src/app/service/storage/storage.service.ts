import { Injectable } from '@angular/core';
import { TokenType } from 'app/model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  getToken(type: TokenType): string | null {
    return this.storage.getItem(type.toString());
  }

  setToken(type: TokenType, value: string) {
    this.storage.setItem(type.toString(), value);
  }
}
