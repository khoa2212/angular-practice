import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsPageComponent } from './departments-page.component';

describe('DepartmentsPageComponent', () => {
  let component: DepartmentsPageComponent;
  let fixture: ComponentFixture<DepartmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
