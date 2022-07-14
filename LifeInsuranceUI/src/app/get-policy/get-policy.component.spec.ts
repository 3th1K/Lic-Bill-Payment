import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPolicyComponent } from './get-policy.component';

describe('GetPolicyComponent', () => {
  let component: GetPolicyComponent;
  let fixture: ComponentFixture<GetPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
