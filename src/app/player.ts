export interface Player {
    _id: {
      $oid: string;
    };
    name: string;
    adp: number;
    player_id: string;
    weeklyProj: {
      [week: string]: {
        opponent: string;
        company: string;
        team: string;
        game_id: string;
        player_id: string; 
        season: string;
        season_type: string;
        sport: string;
        week: number;
        last_modified: number;
        category: string;
        stats: {
          rec_yd: number;
          rec_tgt: number;
          rec_td: number;
          rec_fd: number;
          rec_5_9: number;
          rec_40p: number;
          rec_30_39: number; 
          rec_20_29: number;
          rec_10_19: number;
          rec_0_4: number;
          rec: number;
          pts_std: number;
          pts_ppr: number;
          pts_half_ppr: number;
          pos_adp_dd_ppr: number;
          gp: number;
          bonus_rec_te: number;
          adp_dd_ppr: number;
        };
        date: string; 
      }
    };
    weeklyActualPts: number[];
    projTotalPts: number;
    avgProjPts: number;
    actualTotalPts: number;
    avgActualPts: number;
    position: string;
    tradeValue: number;
    rosProjTotal: number;
    tradeValueColor: string;
    currentWeek: number;
    activeWeeks: number;
    pos_rank_ppr: number;
    ovr_rank_ppr: number;
    injury: string;
    injuryBodyPart: string;
    team: string;
    active: boolean;
    weeklyStats: {
      [week: string]: {
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
      }
    };
    seasonProj: {
      player: {
        years_exp: number;
        team: string;
        position: string;
        news_updated: number;
        metadata: {
          rookie_year: string;
        };
        last_name: string;
        injury_status: string | null;
        injury_start_date: string | null;
        injury_notes: string | null;
        injury_body_part: string | null;
        first_name: string;
        fantasy_positions: string[];
      };
      opponent: string | null;
      company: string;
      team: string;
      game_id: string;
      player_id: string;
      sport: string;
      season_type: string;
      season: string;
      week: string | null;
      last_modified: number;
      category: string;
      stats: {
        rec_yd: number;
        rec_td: number;
        rec_fd: number;
        rec_5_9: number;
        rec_40p: number;
        rec_30_39: number;
        rec_20_29: number;
        rec_10_19: number;
        rec_0_4: number;
        rec: number;
        pts_std: number;
        pts_ppr: number;
        pts_half_ppr: number;
        gp: number;
        bonus_rec_te: number;
        adp_std: number;
        adp_rookie: number;
        adp_ppr: number;
        adp_idp: number;
        adp_half_ppr: number;
        adp_dynasty_std: number;
        adp_dynasty_ppr: number;
        adp_dynasty_half_ppr: number;
        adp_dynasty_2qb: number;
        adp_dynasty: number;
        adp_2qb: number;
      };
      date: string | null;
    };
  
    seasonStats: {
      player: {
        years_exp: number;
        team: string;
        position: string;
        news_updated: number;
        metadata: {
          rookie_year: string;
        }
        last_name: string;
        injury_status: string | null;
        injury_start_date: string | null;
        injury_notes: string | null;
        injury_body_part: string | null;
        first_name: string;
        fantasy_positions: string[];
      };
      opponent: string | null;
      company: string;
      team: string;
      game_id: string;
      player_id: string;
      sport: string;
      season_type: string;
      season: string;
      week: string | null;
      last_modified: number;
      category: string;
      stats: {
        tm_st_snp: number;
        tm_off_snp: number;
        tm_def_snp: number;
        st_tkl_solo?: number;
        st_snp: number;
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
      };
      date: string | null;
    };
  
  }
