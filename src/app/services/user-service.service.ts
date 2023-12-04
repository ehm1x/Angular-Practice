import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import {from, EMPTY} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_BASE = "https://api.sleeper.app/v1";
  private username = new Subject<string>;
  username$ = this.username.asObservable();
  
  private userData = new Subject<any>;
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