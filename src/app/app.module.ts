import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from '../pages/home-page/home-page.component';
import { LeagueSelectionComponent } from '../pages/home-page/components/league-selection/league-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerRankingsComponent } from '../pages/player-rankings/player-rankings.component';
import { TeamRankingsComponent } from '../pages/team-rankings/team-rankings.component';
import { TradeAnalyzerComponent } from '../pages/trade-analyzer/trade-analyzer.component';
import { ShowRostersComponent } from '../pages/show-rosters/show-rosters.component';
import { TeamComponent } from '../pages/show-rosters/components/team/team.component';
import { PlayerComponent } from '../pages/show-rosters/components/player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarComponent } from './avatar/avatar.component';
import { RostersGuard } from './rosters.guard';
import { TeamSelectorComponent } from '../pages/trade-analyzer/components/team-selector/team-selector.component';
import { PlayerModalComponent } from '../pages/show-rosters/components/player-modal/player-modal.component';
import { StatsTableComponent } from '../pages/show-rosters/components/player-modal/stats-table/stats-table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LeagueSelectionComponent,
    PlayerRankingsComponent,
    TeamRankingsComponent,
    TradeAnalyzerComponent,
    ShowRostersComponent,
    TeamComponent,
    PlayerComponent,
    AvatarComponent,
    TeamSelectorComponent,
    PlayerModalComponent,
    StatsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [RostersGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
