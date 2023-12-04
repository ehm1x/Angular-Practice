import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user-service.service';
import { Player } from '../Interfaces/player';
import { User } from '../Interfaces/user';
import { Team } from '../../utils/team';

@Injectable({ providedIn: 'root' })
export class LeagueService {
  private API_BASE = "https://api.sleeper.app/v1";

  private leagues = new BehaviorSubject<any[]>([]);
  private selectedLeague = new BehaviorSubject<any>(null);
  private rosters = new BehaviorSubject<any[]>([]);
  private confirmedLeague = new BehaviorSubject<boolean>(false);
  private allPlayers = new BehaviorSubject<any[]>([]);
  
  leagues$ = this.leagues.asObservable();
  selectedLeague$ = this.selectedLeague.asObservable();
  rosters$ = this.rosters.asObservable();
  confirmedLeague$ = this.confirmedLeague.asObservable();
  allPlayers$ = this.allPlayers.asObservable();

  private userId: string = '';

  constructor(private userService: UserService, private http: HttpClient) {
    this.userService.userData$.subscribe((userData: User) => {
      if(userData){
        console.log("User data")
        this.userId = userData.user_id;
        this.fetchUserLeagues(this.userId);
      }
      else{
        console.log("No user data")
      }
    });
  }

  setSelectedLeague(newLeague: any) {
    this.selectedLeague.next(newLeague);
  }

  setConfirmedLeague(value: boolean) {
    this.confirmedLeague.next(value);
    this.fetchLeagueDetails(this.selectedLeague.getValue().league_id); 
  }

  fetchUserLeagues(userId: string) {
    this.http.get<Array<Object>>(`${this.API_BASE}/user/${userId}/leagues/nfl/2023 `)
      .subscribe(data => {
        this.leagues.next(data);

        if (data && data.length > 0) {
          this.setSelectedLeague(data[0]);
        }
      });
  }

  fetchLeagueDetails(leagueId: string) {
    combineLatest([
      this.http.get<User[]>(`${this.API_BASE}/league/${leagueId}/users`),
      this.http.get<any[]>(`${this.API_BASE}/league/${leagueId}/rosters`)
    ]).pipe(
      switchMap(([leagueUsers, leagueTeams]) => this.constructTeams(leagueUsers, leagueTeams))
    ).subscribe(rosters => {
      this.rosters.next(rosters);
    });
  }

  private constructTeams(leagueUsers: User[], leagueTeams: any[]): Observable<any[]> {
    const teams = leagueUsers.map(userTeam => {
      const team = new Team(userTeam.display_name, userTeam.user_id, userTeam.avatar);
      const roster = leagueTeams.find(roster => roster.owner_id === userTeam.user_id);

      return this.getDataForAllPlayers(roster.players).pipe(
        map(players => {
          team.roster = players;
          this.allPlayers.next([...this.allPlayers.getValue(), ...players]);
          team.calculateTotalPts();
          team.calculateTotalWeekly();
          team.calculateTradeValue();
          console.log(team); 
          return team;
        })
      );
    });

    return forkJoin(teams);
  }

  getDataForAllPlayers(players: Player[]): Observable<Player[]> {
    return this.http.post<Player[]>(`http://localhost:8080/api/nfl/player-batch`, players).pipe(
      map(playerData => {
        if (!playerData) {
          throw new Error('No player data available');
        } else {
          return playerData;
        }
      })
    );
  }
  handleLeagueChange(leagueId: string) {
    const selectedLeague = this.leagues.getValue().find(league => league.league_id === leagueId);
    this.setSelectedLeague(selectedLeague);
  }

  handleLeagueConfirm() {
    this.setConfirmedLeague(true);
  }
}


