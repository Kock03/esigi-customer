import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-register-tab',
  templateUrl: './customer-register-tab.component.html',
  styleUrls: ['./customer-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerRegisterTabComponent implements OnInit {
  @Input('form') customerForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();


  ngOnInit(): void {
 
  }

  next() {
    this.onChange.next(true);
  }
}
