import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyEmployeeComponent } from './apply-employee.component';

describe('ApplyEmployeeComponent', () => {
  let component: ApplyEmployeeComponent;
  let fixture: ComponentFixture<ApplyEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
