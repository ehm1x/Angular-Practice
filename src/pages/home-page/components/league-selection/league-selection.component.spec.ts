import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueSelectionComponent } from './league-selection.component';

describe('LeagueSelectionComponent', () => {
  let component: LeagueSelectionComponent;
  let fixture: ComponentFixture<LeagueSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeagueSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeagueSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
