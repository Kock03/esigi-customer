import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { ICustomer } from 'src/app/interfaces/icustomer';

import { CustomerProvider } from 'src/providers/customer.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';


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

  customers!: ICustomer[];
  filteredCustomerList = new MatTableDataSource();
  index: any = null;
  Customer: any;
  step: number = 1;
  form!: UntypedFormGroup;
  customer!: any;
  params: string = '';
  select: number = 1;
  token!: string;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private customerProvider: CustomerProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getCustomerList();
    this.initFilter();
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

  async selectList(ev: any) {
    this.select = ev.value
    this.searchCustomers();

  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredCustomerList.data = this.customers.filter(
          (costumer) =>
            costumer.corporateName
              .toLocaleLowerCase()
              .includes(this.filter.nativeElement.value.toLocaleLowerCase())

        )
        this.params = this.filter.nativeElement.value;
        this.searchCustomers();
      });

  }

  async searchCustomers() {
    const data = {
      corporateName: this.params,
      status: this.select,
    };
    try {
      this.filteredCustomerList.data = this.customers = await this.customerProvider.findByName(data);
    } catch (error) {
      console.error(error);
    }
  }

  createCustomer() {
    this.router.navigate(['cliente/novo']);
  }

  editCustomer(customerId: any, address: any) {
    this.router.navigate([`cliente/${customerId}`]);
    const method = 'edit';
    sessionStorage.setItem('customer_method', method)
    sessionStorage.setItem('flag_value', address.flag);
    sessionStorage.setItem('country_value', address.country);


    sessionStorage.setItem('customer_id', customerId);
  }

  async deleteCustomer(customerId: any) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir este cliente?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        try {
          const customers = await this.customerProvider.destroy(customerId);
          this.getCustomerList();
          this.snackbarService.showAlert('Item Excluido com sucesso')
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao deletar')
        }
      }
    }
    )
  }

  goHome(): void {
    location.replace(`http://192.168.8.184:3406/validate/${this.token}`);
  }
}


