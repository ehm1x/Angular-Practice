import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user-service.service';
@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private selectedLeague = new BehaviorSubject<string | null>(null);
  selectedLeague$ = this.selectedLeague.asObservable();
  
  public rosters = new BehaviorSubject<Array | null>(null);

  private userId: string = ''; 

  setSelectedLeague(newLeague: string) {
    this.selectedLeague.next(newLeague);
  }
  constructor(private userService: UserService) { 
    this.userService.userData$.subscribe(userData => {
      if(userData){
        this.userId = userData.user_id;
        fetchLeagues(this.userId); 
      }

  }
}
