import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  displayedCustomer: string[] = ['name', 'birthDate', 'phoneNumber', 'icon'];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createCustomer() {
    this.router.navigate(['cliente/novo']);
  }

}
