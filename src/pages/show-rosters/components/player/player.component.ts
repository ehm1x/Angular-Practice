import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../../app/Interfaces/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() player!: Player;
  isOpen = false;
  boxColor!: string;
  imgUrl!: string;
  
  ngOnInit() {
    const colors = {
      yellow: 'rgba(255, 255, 0, 0.5)', // yellow with 50% opacity
      purple: 'rgba(128, 0, 128, 0.5)', // purple with 50% opacity
      blue: 'rgba(0, 0, 255, 0.5)', // blue with 50% opacity
      green: 'rgba(0, 128, 0, 0.5)', // green with 50% opacity
      red: 'rgba(255, 0, 0, 0.5)' // red with 50% opacity
    };
  
    if (this.player.tradeValue > 75) {
      this.boxColor = colors.yellow;
    } else if (this.player.tradeValue > 50) {
      this.boxColor = colors.purple;
    } else if (this.player.tradeValue > 25) {
      this.boxColor = colors.blue;
    } else if (this.player.tradeValue >= 10) {
      this.boxColor = colors.green;
    } else {
      this.boxColor = colors.red;
    }

    this.imgUrl =
      this.player.position === 'DEF'
        ? `https://sleepercdn.com/images/team_logos/nfl/${this.player.player_id.toLowerCase()}.png`
        : `https://sleepercdn.com/content/nfl/players/${this.player.player_id}.jpg`;
  }

  handleClick(event: Event) {
    event.stopPropagation();
    this.isOpen = true;
  }
}