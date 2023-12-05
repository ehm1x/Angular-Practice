import { Component } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  avatarId$: Observable<string | undefined>; 
  

  constructor(public userService: UserService) {
    this.avatarId$ = userService.userData$;
   }
 
}