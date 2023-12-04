import { Component, OnInit, Input } from '@angular/core';
import { LeagueService } from '../../../../app/services/league.service';
import { UserService } from '../../../../app/services/user-service.service';
@Component({
  selector: 'app-league-selection',
  template: `
    <div class="league-selection-container" *ngIf="leagues && leagues.length > 0">
      <label htmlFor="leagues" class="league-selection-label">
        Select a League:
      </label>
      <div class="flex-conatiner"> 
      <select (change)="handleLeagueChange($event)" class="league-selection-select" style="padding-right: 2px;">
        <option *ngFor="let league of leagues" [value]="league.league_id">
          {{league.name}}
        </option>
      </select>
      <button (click)="handleLeagueConfirm()" class="league-selection-button">
        Confirm
      </button>
</div> 
    </div>
  `,
  styleUrls: ['./league-selection.component.css'],
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