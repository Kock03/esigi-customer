import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  ViewChild,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { CustomerContactProvider } from "src/providers/contact.provider";
import { CustomerProvider } from "src/providers/customer.provider";
import { CustomerContactDialog } from "./customer-contact-dialog.component";

export interface Contact {
  name: string;
  office: string;
  mail: string;
  phoneNumber: string;
  status: boolean;
}

@Component({
  selector: "app-customer-contact-tab",
  templateUrl: "./customer-contact-tab.component.html",
  styleUrls: ["./customer-contact-tab.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerContactTabComponent implements OnInit {
  @Output("onChange") onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild("contactTable") contactTable!: MatTable<any>;

  displayedColumns: string[] = [
    "name",
    "office",
    "mail",
    "phoneNumber",
    "icon",
  ];

  data: [] = [];
  
  contactForm!: FormGroup;
  Contact: any;
  checked = false;
  method!: string;
  customerId!: any;
  contactId!: string;
  customerMethod!: string;
  selectedIndex: number = 0;
  

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private customerContactProvider:CustomerContactProvider,
    private customerProvider: CustomerProvider) {}

  ngOnInit(): void {
    this.customerMethod = sessionStorage.getItem('customer_method')!;
    if (this.customerMethod === 'edit') {
      this.getContactList();
    }
  }

  async getContactList() {
    this.customerId = sessionStorage.getItem('customer_id');
    const data = await this.customerProvider.findOne(this.customerId);
    this.data = data.Contacts;
  }

 

  next() {
    this.onChange.next(true);
  }

  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(CustomerContactDialog, {
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(contact => {
      if (contact) {
        this.getContactList()
      }
    });
  }

 async getContact(id: string) {
   const contact = await this.customerContactProvider.findOne(id)
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.contactId = id;
    sessionStorage.setItem('contact_id', this.contactId);
    const dialogRef = this.dialog.open(CustomerContactDialog, {
      width: '500px',
      height: '400px',
      data: contact,
    });
    dialogRef.afterClosed().subscribe(contact => {
      if (contact) {
        this.getContactList();
      }
    });
  }

  async deleteContact(id: string) {

        try {
          let deleteContact = await this.customerContactProvider.destroy(id);
          this.getContactList();
          // this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          // this.snackbarService.showError('Falha ao Excluir');
        }
  }
}
