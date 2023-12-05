import { Component } from '@angular/core';
import { LeagueService } from '../../app/services/league.service';
import { Subscription } from 'rxjs';
import { Player } from '../../app/Interfaces/player';
import { Team } from '../../utils/team';
import { TeamSelectorComponent } from './components/team-selector/team-selector.component';

@Component({
  selector: 'app-trade-analyzer',
  templateUrl: './trade-analyzer.component.html',
  styleUrl: './trade-analyzer.component.css'
})
export class TradeAnalyzerComponent {
  rosters:any = [];
  rostersSubscription!:Subscription; 

  selectedTeam1!:Team | null; 
  selectedTeam2!:Team | null;
  selectedPlayersTeam1: Player[] = []; 
  selectedPlayersTeam2: Player[] = [];

    constructor(public leagueService:LeagueService){
        this.rostersSubscription = this.leagueService.rosters$.subscribe((rosters:any) => {
          this.rosters = rosters; 
        })
    }

    ngOnDestroy() {
      this.rostersSubscription.unsubscribe();
    }

    setSelectedTeam(team:number, owner_id:string){
      if(team === 1){
        this.selectedTeam1 = this.rosters.find((roster:any) => roster.owner_id === owner_id);
        this.selectedTeam1?.roster
          .filter((player) => player !== null)
          .sort((a,b) => b.tradeValue - a.tradeValue);
      }
      else {
        this.selectedTeam2 = this.rosters.find((roster:any) => roster.owner_id === owner_id);
         this.selectedTeam2?.roster
          .filter((player) => player !== null)
          .sort((a,b) => b.tradeValue - a.tradeValue); 
      }
    }

    findTotalTradeValue(players:Player[]){
      return players.reduce((total, player) => total + player.tradeValue, 0);
    }

    selectPlayer(team: number, player: Player) {
      if (team === 1) {
        const index = this.selectedPlayersTeam1.findIndex(p => p.player_id === player.player_id);
        if (index > -1) { //player already exists 
          this.selectedPlayersTeam1.splice(index, 1);
        } else { //player selected
          this.selectedPlayersTeam1.push(player);
        }
      }
      else if (team === 2) {
        const index = this.selectedPlayersTeam2.findIndex(p => p.player_id === player.player_id);
        if (index > -1) { // already exists 
          this.selectedPlayersTeam2.splice(index, 1);
        } else { //doesn't exist 
          this.selectedPlayersTeam2.push(player);
        }
      }
    }


    clearTeam(team:number){
      if(team === 1){
        this.selectedPlayersTeam1 = [];
        this.selectedTeam1 = null;
      }
      else {
        this.selectedPlayersTeam2 = [];
        this.selectedTeam2 = null;
      }
    }

    getTeamTotal(players: {name: string, tradeValue: number}[]): number {
      return players.reduce((total, player) => total + player.tradeValue, 0);
  }
}
