import { Component } from '@angular/core';

import { LeagueService } from '../../app/services/league.service';
import { UserService } from '../../app/services/user-service.service';
import { Observable } from 'rxjs';
import { League } from '../../app/Interfaces/league';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="container">
      <div class="home" *ngIf="username$ | async as username; else welcomeBlock">
      <h2 style="text-align:center">Welcome, {{ username }}</h2>
        <ng-container *ngIf="confirmedLeague$ | async as confirmedLeague; else leagueSelection">
          <div class="mainMenu" *ngIf="confirmedLeague">
            <h2>Current League : {{ (selectedLeague$ | async)?.name }}</h2>
            <nav>
              <div class="flex">
                <a routerLink="/show-rosters">Show Rosters</a>
                <a routerLink="/trade-analyzer">Trade Analyzer</a>
              </div>
            </nav>
          </div>
        </ng-container>
        <ng-template #leagueSelection>
          <app-league-selection></app-league-selection>
        </ng-template>
      </div>
      <ng-template #welcomeBlock>
        <h1 style="padding-bottom: 5px">Welcome</h1>
        <div class="flex">
          <input type="text" [(ngModel)]="inputUsername" class="username-input" placeholder="Username" />
          <button (click)="handleConfirmUser()">Confirm</button>
        </div>
        <main>
        </main>
      </ng-template>
    </div>
  `,
  styleUrls: ['./home-page.component.css'],
})
export class HomeComponent {
  inputUsername: string = '';

  username$: Observable<string>;
  confirmedLeague$: Observable<boolean>;
  selectedLeague$: Observable<League>;

  constructor(
    private userService: UserService,
    private leagueService: LeagueService
  ) {
    this.username$ = userService.username$;
    this.confirmedLeague$ = leagueService.confirmedLeague$;
    this.selectedLeague$ = leagueService.selectedLeague$;
  }

  handleConfirmUser() {
    this.userService.setUsername(this.inputUsername);
  }
}
