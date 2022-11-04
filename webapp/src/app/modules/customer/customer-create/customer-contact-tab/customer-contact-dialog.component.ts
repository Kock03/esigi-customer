

import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfigProvider } from "src/providers/config-provider";
import { CustomerContactProvider } from "src/providers/contact.provider";
import { SnackBarService } from "src/services/snackbar.service";

@Component({
  selector: 'customer-contact-dialog',
  templateUrl: 'customer-contact.dialog.html',
  styleUrls: ['./customer-contact-tab.component.scss'],
})
export class CustomerContactDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  contactForm!: UntypedFormGroup;
  method!: string;
  customerId!: string | null;
  contactId!: string | null;
  phoneForm!: UntypedFormGroup;
  positions: any[] = []

  constructor(
    public dialogRef: MatDialogRef<CustomerContactDialog>,
    private customerContactProvider: CustomerContactProvider,
    private snackbarService: SnackBarService,
    private fb: UntypedFormBuilder,
    private configProvider: ConfigProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.customerId = sessionStorage.getItem('customer_id')!;
    this.getKeys();
    this.initForm();

    const phoneForm = this.contactForm.controls[
      'Phone'
    ] as UntypedFormGroup;
    this.phoneForm = phoneForm
    phoneForm.controls['ddi'].valueChanges.subscribe(res => { });
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

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required]],
      office: ["", [Validators.required]],
      mail: ["", [Validators.required, Validators.email]],
      Customer: { id: this.customerId },
      Phone: this.fb.group({
        phoneNumber: [null],
        ddd: [null],
        ddi: [null],
      }),
    });
    if (this.data) {
      this.contactForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('contact_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.contactForm.getRawValue();
    if (this.method === 'add') {
      try {
        const contact = await this.customerContactProvider.store(data);
        sessionStorage.setItem(' contact_id', contact.id);
        this.snackbarService.showAlert("Contato salvo com sucesso")
      } catch (error: any) {
        console.log('ERROR 132' + error);
        this.snackbarService.showError("F alha ao salvar o contato")
      }
    }
    if (this.method === 'edit') {
      try {
        this.contactId = sessionStorage.getItem('contact_id');
        const updateContact = await this.customerContactProvider.update(
          this.contactId,
          data
        );
        this.snackbarService.showAlert("Contato editado com sucesso")
      } catch (error: any) {
        console.log('ERROR 132' + error);
        this.snackbarService.showError("Falha ao editar o contato")
      }
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}