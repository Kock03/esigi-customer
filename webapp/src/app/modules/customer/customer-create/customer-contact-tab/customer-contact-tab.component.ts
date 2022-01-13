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
import { MatTable } from "@angular/material/table";

export interface Contact {
  name: string;
  office: string;
  mail: string;
  phoneNumber: string;
  status: boolean;
}
export interface Role {
  id: string;
  name: string;
  value: string;
}

@Component({
  selector: "app-customer-contact-tab",
  templateUrl: "./customer-contact-tab.component.html",
  styleUrls: ["./customer-contact-tab.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerContactTabComponent implements OnInit {
  @Input("form") customerForm!: FormGroup;
  @Output("onChange") onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild("contactTable") contactTable!: MatTable<any>;

  displayedColumns: string[] = [
    "name",
    "office",
    "mail",
    "phoneNumber",
    "icon",
  ];
  // dataSource = contacts;

  // contacts: Contact[] = [
  //   {
  //     name: '',
  //     office: 'Comprador',
  //     // 'Diretor de TI', 'Gerente de TI',
  //     mail: '',
  //     phoneNumber: '',
  //     status: false,
  //   },
  // ];

  contactForm!: FormGroup
  roleList = [
    {
      id: 1,
      name: "Diretor",
      value: "Diretor",
    },
    {
      id: 2,
      name: "Presidente",
      value: "Presidente",
    },
  ];

  selectedIndex: number = 0;

  index: any = null;
  Contact: any;
  checked = false;

  get contactArray() {
    return this.customerForm.controls["Contacts"] as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required]],
      office: ["", [Validators.required]],
      mail: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", Validators.required],
    });
  }

  next() {
    this.onChange.next(true);
  }

  saveContact() {
    const data = this.contactForm.getRawValue();
    console.log("🚀 ~ file: customer-contact-tab.component.ts ~ line 102 ~ CustomerContactTabComponent ~ saveContact ~ data", data)
    this.contactArray.insert(0, this.fb.group(data));
    this.contactTable.renderRows();
    this.contactForm.reset();
  }

  getContact(contactSelected: any, index: number) {
    this.index = index;
    this.contactForm.patchValue(contactSelected);
  }

  editContact() {
    this.contactArray.at(this.index).setValue(this.contactForm.getRawValue());

    this.contactTable.renderRows();
    this.contactForm.reset();
    this.index = null;
  }

  cancelEdit() {
    this.index = null;
  }

  deleteContact(index: number) {
    this.contactArray.removeAt(index);
  }
}
