import { ComponentFixture, TestBed } from '@angular/core/testing';


import { CustomerContactTabComponent } from './customer-contact-tab.component';

describe('CustomerContactTabComponent', () => {
  let component: CustomerContactTabComponent;
  let fixture: ComponentFixture<CustomerContactTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContactTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
