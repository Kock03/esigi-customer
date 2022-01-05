import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerCreateComponent implements OnInit {
  customerForm!: FormGroup;
  step: number = 2;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.customerForm = this.fb.group({
      corporateName: ['', Validators.required],
    });
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      const data = this.customerForm.getRawValue();
      console.log(
        '🚀 ~ file: customer-create.component.ts ~ line 29 ~ CustomerCreateComponent ~ saveCustomer ~ data',
        data
      );
    }
  }
  handleChanges(value: any): void {
    console.log(
      '🚀 ~ file: customer-create.component.ts ~ line 28 ~ CustomerCreateComponent ~ handleChanges ~ value',
      value
    );
  }

  handleStep(number: number): void {
    this.step = number;
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 3 && direction === 'next') {
      this.step += 1;
    }
  }
}
