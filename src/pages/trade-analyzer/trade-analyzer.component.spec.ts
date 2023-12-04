import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAnalyzerComponent } from './trade-analyzer.component';

describe('TradeAnalyzerComponent', () => {
  let component: TradeAnalyzerComponent;
  let fixture: ComponentFixture<TradeAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradeAnalyzerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradeAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
