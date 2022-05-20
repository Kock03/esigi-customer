import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerProvider } from "src/providers/customer.provider";
import { CepService } from "src/services/cep.service";

@Component({
  selector: "app-customer-create",
  templateUrl: "./customer-create.component.html",
  styleUrls: ["./customer-create.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerCreateComponent implements OnInit {
  customerForm!: FormGroup;
  step: any = 1;
  customer!: any;
  customerId!: string | null;


  validations = [['corporateName', 'cnpj', 'mail', 'site']];

  constructor(private fb: FormBuilder, private customerProvider: CustomerProvider, private http: HttpClient, private cepService: CepService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    if (sessionStorage.getItem('customer_tab') == undefined) {
      sessionStorage.setItem('customer_tab', '1');
    }
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('customer_tab')!);

    if (this.customerId !== 'novo') {
      await this.getCustomer();
      this.initForm();
      this.setFormValue();
    } else {
      this.initForm();
    }
  }

  async getCustomer() {
    try {
      this.customer = await this.customerProvider.findOne(
        this.customer
      );
    } catch (error) {
      console.error(error);
    }
  }

  setFormValue() {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }
  }

  listCustomer() {
    this.router.navigate(['cliente/lista']);
    sessionStorage.clear();
  }

  initForm() {
    this.customerForm = this.fb.group({
      corporateName: ['', Validators.required],
      tradingName: ['', Validators.required],
      createDate: ['', Validators.required],
      active: [false, Validators.required],
      cnpj: [
        '',
        Validators.required,
        Validators.maxLength(14),
        Validators.minLength(14),

      ],
      stateRegistration: [
        '',
        Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      municipalRegistration: [
        '',
        Validators.required, Validators.maxLength(9), Validators.minLength(9)],

      phoneNumber: ['', Validators.required],
      mail: ['', Validators.required, Validators.email],
      site: ['', Validators.required],
      name: ["", [Validators.required]],
      office: ["", [Validators.required]],

      Address: this.fb.group({
        zipCode: [
          '',
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9),
        ],
        street: ['', Validators.required],
        number: ['', Validators.required],
        complement: [''],
        state: ['', Validators.required],
        city: ['', Validators.required],
        site: ['', Validators.required]
      }),
    });
  }
  async saveCustomer() {
    let data = this.customerForm.getRawValue();
    try {
      this.handleStep(2)
      const customer = await this.customerProvider.store(data);
      sessionStorage.setItem('customer_id', customer.id);
      sessionStorage.clear();
    } catch (error: any) {
      console.log('ERROR 132' + error);
    }
  }

  async saveEditCustomer() {
    let data = this.customerForm.getRawValue();
    try {
      const customer = await this.customerProvider.update(this.customerId, data);
      this.router.navigate(['curriculo/lista']);
    } catch (error) {
      console.error(error);
    }
  }


  handleChanges(value: any): void { }

  handleStep(number: number): void {
    if (!this.checkValid() && this.step < number) {
    } else if (this.step - number < 1) {
      this.step = number;
      sessionStorage.setItem('customer_tab', this.step.toString());
    } else {
      this.step = number;
      sessionStorage.setItem('customer_tab', this.step.toString());
    }
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.checkValid() && this.step < 8 && direction === 'next') {
      this.step += 1;
    } else {
      // this.snackbarService.showAlert('Verifique os campos');
    }
  }

  checkValid(): boolean {
    let isValid = true;
    const validations = this.validations[0];
    for (let index = 0; index < validations.length; index++) {
      if (this.customerForm.controls[validations[index]].invalid) {
        isValid = false;

        this.customerForm.markAllAsTouched();
      }
    }
    return isValid;
  }

 
}
