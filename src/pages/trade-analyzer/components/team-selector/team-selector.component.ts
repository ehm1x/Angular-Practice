
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrl: './team-selector.component.css'
})
export class TeamSelectorComponent {
  @Input() teams: {owner_id: string, teamName: string}[] = [];
  @Output() teamSelected: EventEmitter<string> = new EventEmitter<string>();
  selectTeam(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
  
    if (value) {
      this.teamSelected.emit(value);
    }
  }
}

