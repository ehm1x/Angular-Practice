import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../../../utils/team';
import { Player } from '../../../../app/Interfaces/player'; 
import { AvatarComponent } from '../../../../app/avatar/avatar.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() team!: Team;
  sortedAndFilteredPlayers!: Player[];
  showPlayers: boolean = false;

  ngOnInit(){
    this.sortedAndFilteredPlayers = this.team.roster.filter((player) => player !== null)
    .sort((a,b) => b.tradeValue - a.tradeValue); 
  }
  
  toggleShowPlayers() {
    this.showPlayers = !this.showPlayers;
  }
}