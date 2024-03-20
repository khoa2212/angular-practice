import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWithHoursReportComponent } from './employee-with-hours-report.component';

describe('EmployeeWithHoursReportComponent', () => {
  let component: EmployeeWithHoursReportComponent;
  let fixture: ComponentFixture<EmployeeWithHoursReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeWithHoursReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeWithHoursReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
