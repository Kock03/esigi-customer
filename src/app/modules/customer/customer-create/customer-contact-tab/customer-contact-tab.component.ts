import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';


export interface contact {
  name: string;
  office: string;
  email: string;
  cell: string;
  status: string;

}

const contacts: contact[] = [
  { name: 'Bianca', office: 'Estagiária', email: 'bianca.nilsen@envolti.com.br', cell: '(47) 99283-4501',  status: 'Ativa'},
  { name: 'Bianca', office: 'Estagiária', email: 'bianca.nilsen@envolti.com.br', cell: '(47) 99283-4501',  status: 'Ativa'},
  { name: 'Bianca', office: 'Estagiária', email: 'bianca.nilsen@envolti.com.br', cell: '(47) 99283-4501',  status: 'Ativa'},
  { name: 'Bianca', office: 'Estagiária', email: 'bianca.nilsen@envolti.com.br', cell: '(47) 99283-4501',  status: 'Ativa'},
  { name: 'Bianca', office: 'Estagiária', email: 'bianca.nilsen@envolti.com.br', cell: '(47) 99283-4501',  status: 'Ativa'},
  { name: 'Bianca', office: 'Estagiária', email: 'bianca.nilsen@envolti.com.br', cell: '(47) 99283-4501',  status: 'Ativa'},
  { name: 'Bianca', office: 'Estagiária', email: 'bianca.nilsen@envolti.com.br', cell: '(47) 99283-4501',  status: 'Ativa'},
  { name: 'Bianca', office: 'Estagiária', email: 'bianca.nilsen@envolti.com.br', cell: '(47) 99283-4501',  status: 'Ativa'},
  { name: 'Bianca', office: 'Estagiária', email: 'bianca.nilsen@envolti.com.br', cell: '(47) 99283-4501',  status: 'Ativa'},

]; 
@Component({
  selector: 'app-customer-contact-tab',
  templateUrl: './customer-contact-tab.component.html',
  styleUrls: ['./customer-contact-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerContactTabComponent implements OnInit {
  @Input('form') customerForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['name', 'office', 'email', 'cell', 'status'];
  dataSource = contacts;

  constructor() {}

  ngOnInit(): void {
    
  }
  next() {
    this.onChange.next(true);
  }
}

