import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import {from, EMPTY} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_BASE = "https://api.sleeper.app/v1";
  private username = new BehaviorSubject<string | null>(null);
  username$ = this.username.asObservable();
  
  private userData = new BehaviorSubject<any | null>(null);
  userData$ = this.userData.asObservable();

  setUsername(newUsername: string) {
    this.username.next(newUsername);
  }
  
  constructor() {
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
    });
  }

  private async fetchUserData(username: string) {
    return await fetch(`${this.API_BASE}/user/${username}`).then(response => response.json());
  }
}