import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-contact-tab',
  templateUrl: './customer-contact-tab.component.html',
  styleUrls: ['./customer-contact-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerContactTabComponent implements OnInit {
  @Input('form') customerForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
