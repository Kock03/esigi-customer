import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegisterTabComponent } from './customer-register-tab.component';

describe('CustomerRegisterTabComponent', () => {
  let component: CustomerRegisterTabComponent;
  let fixture: ComponentFixture<CustomerRegisterTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRegisterTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRegisterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
