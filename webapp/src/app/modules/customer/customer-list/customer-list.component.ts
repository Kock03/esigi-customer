import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { CustomerProvider } from 'src/providers/customer.provider';

export interface Customer {
  id: string;
  corporateName: string;
  birthDate: Date;
  phoneNumber: number;
}
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  displayedCustomer: string[] = ['name', 'birthDate', 'phoneNumber', 'icon'];

  customers!: Customer[];
  filteredCustomerList = new MatTableDataSource();
  index: any = null;
  Customer: any;
  step: number = 1;
  form!: FormGroup;
  customer!: any;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private customerProvider: CustomerProvider,
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  async getCustomerList() {
    try {
      this.filteredCustomerList.data = this.customers =
        await this.customerProvider.findAll();
      this.filteredCustomerList.sort = this.sort;
    } catch (error) {
      console.error(error);
    }
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  createCustomer() {
    this.router.navigate(['cliente/novo']);
  }

  editCustomer(customerId: any) {
    this.router.navigate([`cliente/${customerId}`]);
    const method = 'edit';
    sessionStorage.setItem('customer_method', method)
    sessionStorage.setItem('customer_id', customerId);
  }

  async deleteCustomer(customerId: any) {
        try {
          const customers = await this.customerProvider.destroy(customerId);
          this.getCustomerList();

        } catch (error) {
          console.log('ERROR 132' + error);
        }
      }
  }


