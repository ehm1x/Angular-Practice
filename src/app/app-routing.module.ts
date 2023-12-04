import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home-page/home-page.component';
import { PlayerRankingsComponent } from '../pages/player-rankings/player-rankings.component';
import { TradeAnalyzerComponent } from '../pages/trade-analyzer/trade-analyzer.component';
import { TeamRankingsComponent } from '../pages/team-rankings/team-rankings.component';
import { ShowRostersComponent } from '../pages/show-rosters/show-rosters.component';
import { RostersGuard } from './rosters.guard';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'player-rankings', component: PlayerRankingsComponent, canActivate: [RostersGuard]},
  {path: 'trade-analyzer', component: TradeAnalyzerComponent, canActivate: [RostersGuard]},
  {path: 'team-rankings', component: TeamRankingsComponent, canActivate: [RostersGuard]},
  {path: 'show-rosters', component: ShowRostersComponent, canActivate: [RostersGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
