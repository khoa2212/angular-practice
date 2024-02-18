import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeTableComponent } from './relative-table.component';

describe('RelativeTableComponent', () => {
  let component: RelativeTableComponent;
  let fixture: ComponentFixture<RelativeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelativeTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelativeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
