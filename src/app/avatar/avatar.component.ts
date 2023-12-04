import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar-container">
      <img [src]="avatarUrl" alt="Avatar :(" class="avatar-image" />
    </div>
  `,
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  @Input() avatarId: string = '';
  avatarUrl: string = '';

  ngOnInit() {
    this.avatarUrl = `https://sleepercdn.com/avatars/thumbs/${this.avatarId}`;
  }
}