import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWithEmployeeReportComponent } from './project-with-employee-report.component';

describe('ProjectWithEmployeeReportComponent', () => {
  let component: ProjectWithEmployeeReportComponent;
  let fixture: ComponentFixture<ProjectWithEmployeeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectWithEmployeeReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectWithEmployeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
