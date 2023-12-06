import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Player } from '../../../../app/Interfaces/player';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrl: './player-modal.component.css'
})
export class PlayerModalComponent implements OnInit{
  @Input() isOpen: boolean = false;
  @Input() player!: Player;
  @Output() closeModal = new EventEmitter<Event>();
  imgUrl!: string;  
  ngOnInit(){
    if(this.player){
      this.imgUrl = this.player.position === "DEF" 
        ? `https://sleepercdn.com/images/team_logos/nfl/${this.player.player_id.toLowerCase()}.png`
        : `https://sleepercdn.com/content/nfl/players/${this.player.player_id}.jpg`;
    }
  }
  handleClose($event: Event) {
    $event?.stopPropagation(); 
    this.closeModal.emit();
  }
}