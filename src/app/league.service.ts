import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user-service.service';
import { Player } from './player';
import { User } from './user';
import { Leag}

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
        this.userId = userData.user_id;
        this.fetchUserLeagues(this.userId);
      }
    });
  }

  setSelectedLeague(newLeague: any) {
    this.selectedLeague.next(newLeague);
  }

  setConfirmedLeague(value: boolean) {
    this.confirmedLeague.next(value);
  }

  fetchUserLeagues(userId: string) {
    this.http.get(`${this.API_BASE}/user/${userId}/leagues/nfl/2023 `)
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


class Team {
  teamName: string;
  owner_id: string;
  avatar_id: string;
  roster: Player[];
  totalPts: number;
  totalWeekly: number;
  totalTradeValue: number;

  constructor(tName: string, owner: string, avatar: string) {
    this.teamName = tName || "";
    this.owner_id = owner;
    this.avatar_id = avatar || "";
    this.roster = [];
    this.totalPts = 0;
    this.totalWeekly = 0;
    this.totalTradeValue = 0;
  }

  construct(): void {
    this.calculateTotalPts();
    this.calculateTradeValue();
    this.calculateTotalWeekly();
  }

  calculateTotalPts(): void {
    this.totalPts = 0;
    this.roster.forEach((player: Player) => {
      if (player) {
        this.totalPts += player.actualTotalPts;
      }
    });
  }

  calculateTradeValue(): void {
    this.totalTradeValue = 0;
    this.roster.forEach((player: Player) => {
      if (player) {
        this.totalTradeValue += player.tradeValue;
      }
    });
  }

  calculateTotalWeekly(): void {
    this.totalWeekly = 0;
    this.roster.forEach((player: Player) => {
      if (player) {
        this.totalWeekly += player.avgActualPts;
      }
    });
  }
}