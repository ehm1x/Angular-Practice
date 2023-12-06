
import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../../../app/Interfaces/player';
import { ColorMapper } from '../../../../../utils/color-mapper';


@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrl: './stats-table.component.css'
})
export class StatsTableComponent implements OnInit {
  @Input() player!:Player;
  weeklyStatsArray!:WeeklyStatsEntry[];
  STATS_CONFIG = {
    QB: {
      headers: ["Week", "Rank", "Pass ATT", "Comp", "Pass YD", "TD Pass", "Rush TD", "Rush ATT", "Rush YD", "PPR Pts"],
      dataKeys: ["week", "pos_rank_ppr", "pass_att", "pass_cmp", "pass_yd", "pass_td", "rush_td", "rush_att", "rush_yd", "pts_ppr"],
      colorNames: ["", "RankColor", "PassAttColor", "PassCompColor", "PassYdColor", "PassTdColor", "QbRushTdColor", "QbRushAttColor", "QbRushYdColor", "QbPtsColor"]
    },
    RB: {
      headers: ["Week", "Rank", "PPR Pts", "Rush ATT", "Rush YD", "Rush TD", "Rec", "Rec YD", "Rec TD" ],
      dataKeys: ["week", "pos_rank_ppr", "pts_ppr", "rush_att", "rush_yd", "rush_td", "rec", "rec_yd", "rec_td", ],
      colorNames: ["", "RankColor", "PtsColor", "RushAttColor", "RushYdColor", "TdColor", "RbReceptionsColor", "RbRecYdColor", "RecTdColor"]
    },
    WR: {
      headers: ["Week", "Rank", "Rec", "Rec YD", "Rec TD", "Rush ATT", "Rush YD", "Rush TD", "PPR Pts"],
      dataKeys: ["week", "pos_rank_ppr", "rec", "rec_yd", "rec_td", "rush_att", "rush_yd", "rush_td", "pts_ppr"],
      colorNames: ["", "RankColor", "RecColor", "WrRecYdColor", "RecTdColor", "RushAttColor", "RushYdColor", "RecTdColor", "PtsColor"]
    },
    TE:  {
      headers: ["Week", "Rank", "Rec", "Rec YD", "Rec TD", "Rush ATT", "Rush YD", "Rush TD", "PPR Pts"],
      dataKeys: ["week", "pos_rank_ppr", "rec", "rec_yd", "rec_td", "rush_att", "rush_yd", "rush_td", "pts_ppr"],
      colorNames: ["", "RankColor", "RecColor", "WrRecYdColor", "RecTdColor", "RushAttColor", "RushYdColor", "RecTdColor", "PtsColor"]
    }
  };
  
  get statsConfig() {
    return this.player ? this.STATS_CONFIG[this.player.position as keyof typeof this.STATS_CONFIG] : null; 
  }
  
  getStatByKey(stats: { [key: string]: number }, key: string): number {
    return stats[key as keyof typeof stats] || 0;
  }

  getColor(key:string, value:number, reverse: number) {
    return ColorMapper.findFunc(key, value, reverse);
  }
  ngOnInit(){
    this.weeklyStatsArray = Object.values(this.player.weeklyStats); 
  }
  
  findReverse(key:string){
    if(key === "pos_rank_ppr"){
      return 1; 
    }
    else return 0; 
  }
}

type WeeklyStatsEntry = {
  opponent: string;
  company: string;
  team: string;
  game_id: string;
  player_id: string;
  sport: string;
  season_type: string;
  season: string;
  week: number;
  last_modified: number;
  category: string;
  stats: {
    tm_st_snp: number;
    tm_off_snp: number;
    tm_def_snp: number;
    rec_tgt?: number;
    rec_drop?: number;
    pos_rank_std?: number;
    pos_rank_ppr?: number;
    pos_rank_half_ppr?: number;
    off_snp?: number;
    gp?: number;
    gms_active?: number;
  };
  date: string;
};