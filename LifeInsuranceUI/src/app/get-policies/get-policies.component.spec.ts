import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPoliciesComponent } from './get-policies.component';

describe('GetPoliciesComponent', () => {
  let component: GetPoliciesComponent;
  let fixture: ComponentFixture<GetPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPoliciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
