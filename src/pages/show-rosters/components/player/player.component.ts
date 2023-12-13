import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../../app/Interfaces/player';
import { PlayerModalComponent } from '../player-modal/player-modal.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() player!: Player;
  isModalOpen = false;
  boxColor!: string;
  imgUrl!: string;
  boxColorClass:string='';
  ngOnInit() {
      if (this.player.tradeValue > 75) {
        this.boxColorClass = 'bg-yellow-500';
      } else if (this.player.tradeValue > 50) {
        this.boxColorClass = 'bg-purple-500';
      } else if (this.player.tradeValue > 25) {
        this.boxColorClass = 'bg-blue-500';
      } else if (this.player.tradeValue >= 10) {
        this.boxColorClass = 'bg-green-500';
      } else {
        this.boxColorClass = 'bg-red-500';
      }

    this.imgUrl =
      this.player.position === 'DEF'
        ? `https://sleepercdn.com/images/team_logos/nfl/${this.player.player_id.toLowerCase()}.png`
        : `https://sleepercdn.com/content/nfl/players/${this.player.player_id}.jpg`;
  }

  openModal($event: Event){
    $event?.stopPropagation();
      this.isModalOpen=true; 
  }
  closeModal($event: Event) {
    $event?.stopPropagation();
    this.isModalOpen = false;
  }

}