import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../app/services/league.service';
import { Player } from '../../app/Interfaces/player';
import { Subscription, combineLatest } from 'rxjs';
import { ColorMapper } from '../../utils/color-mapper';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-player-rankings',
  templateUrl: './player-rankings.component.html',
  styleUrl: './player-rankings.component.css',
})
export class PlayerRankingsComponent implements OnInit {
  allPlayers!: Player[];
  sortedPlayers$!: Observable<Player[]>; // This will be our Observable of sorted players
  allPlayersSubscription!: Subscription;
  sortField: BehaviorSubject<keyof SeasonStats> = new BehaviorSubject(
    `pos_rank_ppr` as keyof SeasonStats
  );
  sortPositions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  sortDirection = new BehaviorSubject(-1);

  constructor(public leagueService: LeagueService) {}

  ngOnInit() {
    this.allPlayersSubscription = this.leagueService.allPlayers$.subscribe(
      (players: Player[]) => {
        this.allPlayers = players.filter(
          (player: Player) => player !== null && player.seasonStats
        );
        this.sortPlayers();
      }
    );

    this.sortedPlayers$ = combineLatest([
      this.sortField,
      this.sortPositions,
      this.sortDirection,
    ]).pipe(map(() => this.sortPlayers()));
  }

  sortPlayers(): Player[] {
    return this.allPlayers
      .filter((player: Player) => {
        const hasSortedField: boolean = player.seasonStats.stats.hasOwnProperty(
          this.sortField.getValue()
        );
        const matchesPosition: boolean =
          this.sortPositions.getValue().length > 0
            ? this.sortPositions.getValue().includes(player.position)
            : true;
        return hasSortedField && matchesPosition;
      })
      .sort((a: Player, b: Player) => {
        const aValue = a.seasonStats.stats[this.sortField.getValue()] || 0;
        const bValue = b.seasonStats.stats[this.sortField.getValue()] || 0;
        if (Math.abs(aValue - bValue) < 0.0001) {
          return 0;
        } else if (aValue < bValue) {
          return 1 * this.sortDirection.getValue();
        } else {
          return -1 * this.sortDirection.getValue();
        }
      });
  }

  changeSortDirection() {
    this.sortDirection.next(this.sortDirection.getValue() * -1);
  }

  handleSort(field: keyof SeasonStats) {
    this.sortField.next(field);
    this.changeSortDirection();
  }

  togglePosition(position: string): void {
    if (this.isPositionIncluded(position)) {
      const positions = this.sortPositions
        .getValue()
        .filter((pos) => pos !== position);
      this.sortPositions.next(positions);
    } else {
      this.sortPositions.next([...this.sortPositions.getValue(), position]);
    }
  }

  getCellColor(key: any, player: any) {
    if (key.statsKey === 'WrRecYdColor' && player.position === 'RB') {
      key.colorKey = 'RbRecYdColor';
    }
    const statValue = this.getStatColorValue(key, player);
    let reverse = key.statsKey === 'rank_ppr' ? 1 : 0;
    let color = ColorMapper.findFunc(key.colorKey, statValue, reverse);
    return color;
  }

  getStatColorValue(key: any, player: any) {
    if (player.seasonStats?.stats && key.statsKey in player.seasonStats.stats) {
      let statValue = player.seasonStats.stats[key.statsKey];
      if (key.divideBy && player[key.divideBy] > 0) {
        statValue /= player[key.divideBy];
      }
      if(key.statsKey === 'pass_int'){
        statValue = player.seasonStats.stats.pass_int_ratio; 
      }
      return statValue;
    } else {
      return 0;
    }
  }

  getStatValue(key: any, player: any) {
    let statValue =
      player.seasonStats?.stats && key.statsKey in player.seasonStats.stats
        ? player.seasonStats.stats[key.statsKey]
        : 0;
    if (key.fixedDecimal) {
        statValue = statValue.toFixed(2);
    } else {
      statValue = Math.round(statValue);
    }
    return statValue;
  }
  ngOnDestroy() {
    this.allPlayersSubscription.unsubscribe();
  }
  columns: Column[] = [
    { label: 'Pos', sortValue: null },
    { label: 'Player Name', sortValue: null },
    { label: 'Rank', sortValue: 'rank_ppr' },
    { label: 'Total', sortValue: 'pts_ppr' },
    { label: 'Targets', sortValue: 'rec_tgt' },
    { label: 'Receptions', sortValue: 'rec' },
    { label: 'Rec Yards', sortValue: 'rec_yd' },
    { label: "Rec TD", sortValue: 'rec_td' },
    { label: 'Rush Att', sortValue: 'rush_att' },
    { label: "Rush Yd", sortValue: 'rush_yd' },
    { label: "Rush TD", sortValue: 'rush_td' },
    { label: 'Pass Att', sortValue: 'pass_att' },
    { label: 'Pass Comp', sortValue: 'pass_cmp' },
    { label: "Pass Yd", sortValue: 'pass_yd' },
    { label: 'Pass TD', sortValue: 'pass_td' },
    { label: 'INT', sortValue: 'pass_int'},
    { label: 'ATT/INT', sortValue: 'pass_int_ratio' },
   
  ];
  keys = [
    { statsKey: 'rank_ppr', colorKey: 'SeasonRankColor', defaultValue: 99 },
    {
      statsKey: 'pts_ppr',
      colorKey: 'PtsColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'rec_tgt',
      colorKey: 'TargetsColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'rec',
      colorKey: 'RecColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'rec_yd',
      colorKey: 'WrRecYdColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'rec_td',
      colorKey: 'SeasonTdsColor',
      divideBy: null,
      fixedDecimal: false,
    },
    {
      statsKey: 'rush_att',
      colorKey: 'RushAttColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'rush_yd',
      colorKey: 'RushYdColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'rush_td',
      colorKey: 'SeasonTdsColor',
      divideBy: null,
      fixedDecimal: false,
    },
    {
      statsKey: 'pass_att',
      colorKey: 'PassAttColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'pass_cmp',
      colorKey: 'PassCompColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'pass_yd',
      colorKey: 'PassYdColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'pass_td',
      colorKey: 'PassTdColor',
      divideBy: 'activeWeeks',
      fixedDecimal: false,
    },
    {
      statsKey: 'pass_int',
      colorKey: 'IntRatioColor',
      fixedDecimal: false,
    },
    {
      statsKey: 'pass_int_ratio',
      colorKey: 'IntRatioColor',
      fixedDecimal: true,
      defaultValue: 0,
    },

  ];
  positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

  isPositionIncluded(position: string): boolean {
    return this.sortPositions.getValue().includes(position);
  }
}

type ColumnKey = keyof SeasonStats | null;

interface Column {
  label: string;
  sortValue: ColumnKey;
}

const columns: Column[] = [
  { label: 'Position', sortValue: null },
  { label: 'Name', sortValue: null },
  { label: 'Rank', sortValue: 'rank_ppr' },
  { label: 'Season Total', sortValue: 'pts_ppr' },
  { label: 'Weekly Average', sortValue: 'pts_ppr' },
  { label: 'Targets', sortValue: 'rec_tgt' },
  { label: 'Receptions', sortValue: 'rec' },
  { label: 'Receiving Yards', sortValue: 'rec_yd' },
  { label: "Rec TD's", sortValue: 'rec_td' },
  { label: 'Rush Att', sortValue: 'rush_att' },
  { label: "Rush Yd's", sortValue: 'rush_yd' },
  { label: "Rush TD's", sortValue: 'rush_td' },
  { label: 'Pass Att', sortValue: 'pass_att' },
  { label: 'Pass Comp', sortValue: 'pass_cmp' },
  { label: "Pass YD's", sortValue: 'pass_yd' },
  { label: 'Pass TD', sortValue: 'pass_td' },
  { label: 'INT', sortValue: 'pass_int'}, 
  { label: 'TD/INT', sortValue: 'pass_int_ratio' },
];

interface SeasonStats {
  tm_st_snp?: number;
  tm_off_snp?: number;
  tm_def_snp?: number;
  st_tkl_solo?: number;
  st_snp?: number;
  rush_rec_yd?: number;
  rec_ypt?: number;
  rec_ypr?: number;
  rec_yd?: number;
  rec_yar?: number;
  rec_tgt?: number;
  rec_lng?: number;
  rec_fd?: number;
  rec_drop?: number;
  rec_air_yd?: number;
  rec_10_19?: number;
  rec?: number;
  rank_std?: number;
  rank_ppr?: number;
  rank_half_ppr?: number;
  pts_std?: number;
  pts_ppr?: number;
  pts_half_ppr?: number;
  pos_rank_std?: number;
  pos_rank_ppr?: number;
  pos_rank_half_ppr?: number;
  off_snp?: number;
  gp?: number;
  gms_active?: number;
  bonus_rec_te?: number;
  bonus_fd_te?: number;
  rec_td?: number; // new
  rush_att?: number; // new
  rush_yd?: number; // new
  rush_td?: number; // new
  pass_att?: number; // new
  pass_cmp?: number; // new
  pass_yd?: number; // new
  pass_td?: number; // new
  pass_int?: number; // new
  pass_int_ratio?: number; // new
}
