import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LeagueService } from './services/league.service';

@Injectable({
  providedIn: 'root'
})
export class RostersGuard {
  rosters:any;
  private rosterSubscription: Subscription; 
  constructor(private leagueService: LeagueService, private router: Router) {
    this.rosterSubscription = this.leagueService.rosters$.subscribe((rosters) => {
      this.rosters = rosters; 
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    let rostersExist:boolean = this.rosters.length > 0;
    if(!rostersExist) {
      this.router.navigate(['/home']);
      return false;
    }
    return true; 
  }

  ngOnDestroy() {
    this.rosterSubscription.unsubscribe();
  }
}