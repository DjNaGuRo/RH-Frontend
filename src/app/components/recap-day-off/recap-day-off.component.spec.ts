import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapDayOffComponent } from './recap-day-off.component';

describe('RecapDayOffComponent', () => {
  let component: RecapDayOffComponent;
  let fixture: ComponentFixture<RecapDayOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapDayOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapDayOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
