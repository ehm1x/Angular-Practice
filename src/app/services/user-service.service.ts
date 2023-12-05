import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import {from, EMPTY} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_BASE = "https://api.sleeper.app/v1";
  private username = new BehaviorSubject<string>('');
  username$ = this.username.asObservable();
  
  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  setUsername(newUsername: string) {
    this.username.next(newUsername);
  }
  
  constructor() {
    const storedUserData = this.getUserDataFromSessionStorage();
    if(storedUserData){ 
      this.userData.next(storedUserData);
      this.username.next(storedUserData.username); 
    }

    this.username$.pipe(
      switchMap(username => {
        if (username) {
          return from(this.fetchUserData(username));
        }
        else{
          return EMPTY;
        }
      }),
    ).subscribe(userData => {
      this.userData.next(userData);
      sessionStorage.setItem('userData', JSON.stringify(userData)); 
    });
  }

  private async fetchUserData(username: string) {
    return await fetch(`${this.API_BASE}/user/${username}`).then(response => response.json());
  }
  getUserDataFromSessionStorage() {
    const storedUserData = sessionStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
}
}