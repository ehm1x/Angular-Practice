export interface League {
    total_rosters?: number;
    status?: 'pre_draft' | 'drafting' | 'in_season' | 'complete';
    sport?: string;
    settings?: any;
    season_type?: string;
    season?: string;
    scoring_settings?: any;
    roster_positions?: any[];
    previous_league_id?: string;
    name?: string;
    league_id?: string;
    draft_id?: string;
    avatar?: string;
}