import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOffFormComponent } from './day-off-form.component';

describe('DayOffFormComponent', () => {
  let component: DayOffFormComponent;
  let fixture: ComponentFixture<DayOffFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayOffFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
