import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRankingsComponent } from './team-rankings.component';

describe('TeamRankingsComponent', () => {
  let component: TeamRankingsComponent;
  let fixture: ComponentFixture<TeamRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamRankingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
