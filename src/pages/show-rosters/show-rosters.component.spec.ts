import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRostersComponent } from './show-rosters.component';

describe('ShowRostersComponent', () => {
  let component: ShowRostersComponent;
  let fixture: ComponentFixture<ShowRostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowRostersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
