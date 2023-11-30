import { Component, OnInit, Input } from '@angular/core';
import { LeagueService } from '../league.service';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-league-selection',
  template: `
    <div class="flex flex-col items-center space-y-4" *ngIf="leagues && leagues.length > 0">
      <label htmlFor="leagues" className="text-lg font-bold">
        Select a League:
      </label>
      <select (change)="handleLeagueChange($event)" class="p-2 border-2 border-gray-300 rounded w-64">
        <option *ngFor="let league of leagues" [value]="league.league_id">
          {{league.name}}
        </option>
      </select>
      <button (click)="handleLeagueConfirm()" class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
        Confirm League
      </button>
    </div>
  `
})
export class LeagueSelectionComponent implements OnInit {
   leagues: any[] = [];

  constructor(
    private leagueService: LeagueService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.leagueService.leagues$.subscribe((leagues) => {
      this.leagues = leagues;
    });
  }

  handleLeagueChange(event: any) {
    const leagueId = event.target.value;
    this.leagueService.handleLeagueChange(leagueId);
  }

  handleLeagueConfirm() {
    this.leagueService.handleLeagueConfirm();
  }
}