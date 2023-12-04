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
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
