

import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CustomerContactProvider } from "src/providers/contact.provider";

@Component({
    selector: 'customer-contact-dialog',
    templateUrl: 'customer-contact.dialog.html',
    styleUrls: ['./customer-contact-tab.component.scss'],
  })
export class CustomerContactDialog{
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    contactForm!: FormGroup;
    method!: string;
    customerId!: string | null;
    contactId!: string | null;
    phoneForm!: FormGroup;

    roleList = [
      {
        id: 1,
        name: "Comprador",
        value: "Comprador",
      },
      {
        id: 2,
        name: "Diretor de TI",
        value: "Diretor de TI",
      },
      {
        id: 3,
        name: "Gerente de TI",
        value: "Gerente de TI",
      },
    ];
  

    constructor(
        public dialogRef: MatDialogRef<CustomerContactDialog>,
        private customerContactProvider:CustomerContactProvider,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {}

      ngOnInit(): void {
        this.method = sessionStorage.getItem('method')!;
        this.customerId = sessionStorage.getItem('customer_id')!;
        this.initForm();

        const phoneForm = this.contactForm.controls[
          'Phone'
        ] as FormGroup;
        this.phoneForm = phoneForm
        phoneForm.controls['ddi'].valueChanges.subscribe(res => {});
      }

      initForm(): void {
        this.contactForm = this.fb.group({
          name: ["", [Validators.required]],
          office: ["", [Validators.required]],
          mail: ["", [Validators.required, Validators.email]],
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
          } catch (error: any) {
            console.log('ERROR 132' + error);
          }
        }
        if (this.method === 'edit') {
          try {
            this.contactId = sessionStorage.getItem('contact_id');
            const updateContact = await this.customerContactProvider.update(
              this.contactId,
              data
            );
          } catch (error: any) {
            console.log('ERROR 132' + error);
          }
        }
      }
}