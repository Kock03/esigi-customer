import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  ViewChild,
} from "@angular/core";

import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { ContactPanelModel } from "src/models/contact-panel-model";
import { ConfigProvider } from "src/providers/config-provider";
import { CustomerContactProvider } from "src/providers/contact.provider";
import { CustomerProvider } from "src/providers/customer.provider";
import { ConfirmDialogService } from "src/services/confirn-dialog.service";
import { SnackBarService } from "src/services/snackbar.service";
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

  data: any[] = [];

  contactForm!: UntypedFormGroup;
  Contact: any;
  checked = false;
  method!: string;
  customerId!: any;
  contactId!: string;
  customerMethod!: string;
  selectedIndex: number = 0;
  positions: any[] = []

  constructor(
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    private configProvider: ConfigProvider,
    private customerContactProvider: CustomerContactProvider,
    private customerProvider: CustomerProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.getKeys();
    this.customerMethod = sessionStorage.getItem("customer_method")!;
    if (this.customerMethod === "edit") {
      this.getKeys();

      this.getContactList();
    }
  }

  async getKeys() {
    let data = {
      key: ["customer_positions"]
    }
    const arrays = await this.configProvider.findKeys('customer', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.positions = keyList['customer_positions'];
    console.log(this.positions)

  }

  async getContactList() {
    this.customerId = sessionStorage.getItem("customer_id");
    this.data = await this.customerContactProvider.findContacts(this.customerId);
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.positions.length; j++) {
        if (this.data[i].office === this.positions[j].id) {
          this.data[i].office = this.positions[j].value
        }
      }
    }

    this.contactTable.renderRows();

  }

  next() {
    this.onChange.next(true);
  }

  openDialog() {
    this.method = "add";
    sessionStorage.setItem("method", this.method);
    const dialogRef = this.dialog.open(CustomerContactDialog, {
      width: "500px",
      height: "400px",
    });

    dialogRef.afterClosed().subscribe((contact) => {
      if (contact) {
        this.getContactList();
      }
    });
  }

  async getContact(id: string) {
    const contact = await this.customerContactProvider.findOne(id);
    this.method = "edit";
    sessionStorage.setItem("method", this.method);
    this.contactId = id;
    sessionStorage.setItem("contact_id", this.contactId);
    const dialogRef = this.dialog.open(CustomerContactDialog, {
      width: "500px",
      height: "400px",
      data: contact,
    });
    dialogRef.afterClosed().subscribe((contact) => {
      if (contact) {
        this.getContactList();
      }
    });
  }

  async deleteContact(id: string) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir este contato?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(async (confirmed: any) => {
      if (confirmed) {
        try {
          let deleteContact = await this.customerContactProvider.destroy(id);
          this.getContactList();
          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
      }
    }
    )
  }
}
