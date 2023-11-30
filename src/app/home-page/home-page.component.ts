import { Component, OnInit, OnDestroy } from '@angular/core';

import { LeagueService } from '../league.service';
import { UserService } from '../user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="home flex flex-col items-center justify-top h-screen bg-gray-100 text-gray-800">
      <ng-container *ngIf="username; else welcomeBlock">
        <h2 class="text-2xl font-bold mb-4">Welcome, {{this.username}}</h2>
        <app-league-selection *ngIf="!confirmedLeague"
        ></app-league-selection>
        <ng-container *ngIf="confirmedLeague">
          <h2 class="text-xl mb-2">Current League : {{this.selectedLeague}}</h2>
          <nav>
            <div class="flex space-x-4">
              <a routerLink="/show-rosters" class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Show Rosters
              </a>
              <a routerLink="/trade-analyzer" class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Trade Analyzer
              </a>
    
            </div>
          </nav>
        </ng-container>
      </ng-container>
      
      <ng-template #welcomeBlock>
        <h1 class="text-3xl font-bold mb-6">Welcome</h1>
        <div class="flex items-center mb-6">
          <input
            type="text"
            [(ngModel)]="inputUsername"
            class="username-input p-2 border-2 border-gray-300 rounded mr-4"
            placeholder="Username"
          />
          <button (click)="handleConfirmUser()" class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Confirm</button>
        </div>
        <main>
          <router-outlet></router-outlet>
        </main>
      </ng-template>
    </div>
  `,
  styleUrl: './home-page.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  inputUsername:string = ''; 
  
  confirmedLeague = false;
  private confirmedLeagueSubscription!: Subscription;

  selectedLeague = '';
  private selectedLeagueSubscription!: Subscription;

  username: string = ''; 
  private usernameSubscription!: Subscription;
  constructor(
    private userService: UserService,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.usernameSubscription = this.userService.username$.subscribe((username:string) => {
      this.username = username;
    });

    this.confirmedLeagueSubscription = this.leagueService.confirmedLeague$.subscribe((confirmedLeague:boolean) => {
      this.confirmedLeague = confirmedLeague;
    }); 

    this.selectedLeagueSubscription = this.leagueService.selectedLeague$.subscribe((selectedLeague:any) => {
      this.selectedLeague = selectedLeague;
    });

  }

  handleConfirmUser() {
    this.userService.setUsername(this.inputUsername);
  }

  ngOnDestroy() {
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }


}

