import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-customer-create",
  templateUrl: "./customer-create.component.html",
  styleUrls: ["./customer-create.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerCreateComponent implements OnInit {
  customerForm!: FormGroup;
  step: number = 2;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.customerForm.valueChanges.subscribe((res) => {
      console.log(
        "🚀 ~ file: customer-create.component.ts ~ line 20 ~ CustomerCreateComponent ~ ngOnInit ~ this.customerForm.getRawValue();",
        this.customerForm.getRawValue()
      );
    });
  }

  initForm() {
    this.customerForm = this.fb.group({
      customerGroup: ["", Validators.required],
      corporateName: ["TUPI LTDA", [Validators.required]],
      tradingName: ["TUPI", [Validators.required]],

      active: ["", [Validators.required]],
      cnpj: [
        "89177533968",
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.minLength(14),
        ],
      ],
      stateRegistration: [
        "362410298",
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      municipalRegistration: [
        "021563985",
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],

      phoneNumber: ["47 3330-9563", Validators.required],
      mail: ["", [Validators.required, Validators.email]],
      site: ["", [Validators.required]],
      // name: ["", [Validators.required]],
      // office: ["", [Validators.required]],

      Address: this.fb.group({
        zipCode: [
          "89032560",
          [
            Validators.required,
            Validators.maxLength(8),
            Validators.minLength(8),
          ],
        ],
        street: ["Rua Bahia", [Validators.required]],
        number: ["5088", [Validators.required]],
        complement: ["Perto da Academia SportLife"],
        state: ["Santa Catarina ", [Validators.required]],
        city: ["Joinville", [Validators.required]],
      }),

      createDate: ["01/07/2003", [Validators.required]],

      Contacts: this.fb.array([{
        name: "João",
        office: "Comprador",
        phoneNumber: "71 992535862",
        mail: "asda@asdsa",
      },
      {
        name: "Pedro",
        office: "Diretor",
        phoneNumber: "47 992952121",
        mail: "asda@asdsa",
      },
      {
        name: "Maria",
        office: "Gerente de TI",
        phoneNumber: "48 992538654",
        mail: "asda@asdsa",
      },

    ]),
    });
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      const data = this.customerForm.getRawValue();
      console.log(
        "🚀 ~ file: customer-create.component.ts ~ line 29 ~ CustomerCreateComponent ~ saveCustomer ~ data",
        data
      );
    }
  }
  handleChanges(value: any): void {
    console.log(
      "🚀 ~ file: customer-create.component.ts ~ line 28 ~ CustomerCreateComponent ~ handleChanges ~ value",
      value
    );
  }

  handleStep(number: number): void {
    this.step = number;
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === "back") {
      this.step -= 1;
    } else if (this.step < 3 && direction === "next") {
      this.step += 1;
    }
  }
}
