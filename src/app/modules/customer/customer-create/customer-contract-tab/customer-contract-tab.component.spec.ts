import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractTabComponent } from './customer-contract-tab.component';

describe('CustomerContractTabComponent', () => {
  let component: CustomerContractTabComponent;
  let fixture: ComponentFixture<CustomerContractTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
