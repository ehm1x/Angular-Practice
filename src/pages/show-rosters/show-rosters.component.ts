import { Component } from '@angular/core';
import { LeagueService } from '../../app/services/league.service';
import {Subscription } from 'rxjs';
import { Player } from '../../app/Interfaces/player';

@Component({
  selector: 'app-show-rosters',
  templateUrl: './show-rosters.component.html',
  styleUrl: './show-rosters.component.css'
})
export class ShowRostersComponent {
  rosters!: any[];
  rosterSubscription: Subscription;
  constructor(leagueService: LeagueService) {
    this.rosterSubscription = leagueService.rosters$.subscribe((rosters => {
      this.rosters = rosters;
    }))
  }

  ngOnDestroy() {
    this.rosterSubscription.unsubscribe();
  }
}
