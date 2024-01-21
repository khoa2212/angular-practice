import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateRouterComponent } from './private-router.component';

describe('PrivateRouterComponent', () => {
  let component: PrivateRouterComponent;
  let fixture: ComponentFixture<PrivateRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivateRouterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivateRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
