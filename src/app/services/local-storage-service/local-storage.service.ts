import { Injectable } from '@angular/core';
import { LocalStorageKeys } from 'src/app/enums/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getData<T>(key: LocalStorageKeys): T | null {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }

  setData<T>(key: LocalStorageKeys, data: T){
    localStorage.setItem(key, JSON.stringify(data));
  }

  remove(key: LocalStorageKeys){
    localStorage.removeItem(key);
  }

   clear(){
    localStorage.clear();
  }

}
