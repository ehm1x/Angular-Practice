import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LeagueService } from '../../app/services/league.service';
import { UserService } from '../../app/services/user-service.service';
import { Observable } from 'rxjs';
import { League } from '../../app/Interfaces/league';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="container">
      <div
        class="home"
        *ngIf="username$ | async as username; else welcomeBlock"
      >
        <h2 style="text-align:center">Welcome, {{ username }}</h2>
        <ng-container
          *ngIf="
            confirmedLeague$ | async as confirmedLeague;
            else leagueSelection
          "
        >
          <div *ngIf="confirmedLeague">
          <div class="mainMenu" *ngIf="(this.leagueService.loadProgress$ | async)">
            <h2>Current League : {{ (selectedLeague$ | async)?.name }}</h2>
            <nav>
              <div class="flex">
                <a routerLink="/show-rosters">Show Rosters</a>
                <a routerLink="/trade-analyzer">Trade Analyzer</a>
                <a (click)="handleChangeLeague()">Change League</a>
              </div>
            </nav>
              </div>
            <mat-progress-bar class="bar" mode="query" *ngIf="(this.leagueService.loadProgress$ | async) === 0 || null || undefined">
            </mat-progress-bar>

          </div>
        </ng-container>
        <ng-template #leagueSelection>
          <app-league-selection></app-league-selection>
        </ng-template>
      </div>
      <ng-template #welcomeBlock>
        <h1 style="padding-bottom: 5px">Welcome</h1>
        <div class="flex">
          <input
            type="text"
            [(ngModel)]="inputUsername"
            class="username-input"
            placeholder="Username"
          />
          <button (click)="handleConfirmUser()">Confirm</button>
        </div>
        <main></main>
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
    public leagueService: LeagueService
  ) {
    this.username$ = userService.username$;
    this.confirmedLeague$ = leagueService.confirmedLeague$;
    this.selectedLeague$ = leagueService.selectedLeague$;
  }

  handleConfirmUser() {
    this.userService.setUsername(this.inputUsername);
  }
  handleChangeLeague() {
    this.leagueService.changeLeague();
  }
}
