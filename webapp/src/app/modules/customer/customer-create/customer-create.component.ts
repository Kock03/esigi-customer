import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerProvider } from "src/providers/customer.provider";
import { CepService } from "src/services/cep.service";
import { SnackBarService } from "src/services/snackbar.service";

@Component({
  selector: "app-customer-create",
  templateUrl: "./customer-create.component.html",
  styleUrls: ["./customer-create.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerCreateComponent implements OnInit {
  customerForm!: FormGroup;
  step: any = 2;
  customer!: any;
  customerId!: string | null;

  validations = [["corporateName", "tradingName", "cnpj", "mail"]];

  constructor(
    private fb: FormBuilder,
    private customerProvider: CustomerProvider,
    private http: HttpClient,
    private cepService: CepService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService
  ) {}

  async ngOnInit(): Promise<void> {
    this.customerId = this.route.snapshot.paramMap.get("id");
    if (sessionStorage.getItem("customer_tab") == undefined) {
      sessionStorage.setItem("customer_tab", "1");
    }

    this.step = JSON.parse(sessionStorage.getItem("customer_tab")!);

    if (this.customerId !== "novo") {
      await this.getCustomer();
      this.initForm();
      this.setFormValue();
    } else {
      this.initForm();
    }
  }

  async getCustomer() {
    try {
      this.customer = await this.customerProvider.findOne(this.customerId);
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
    this.router.navigate(["cliente/lista"]);
    sessionStorage.clear();
  }

  initForm() {
    this.customerForm = this.fb.group({
      corporateName: [null, Validators.required],
      tradingName: [null, Validators.required],
      birthDate: [null],
      inactive: [false],
      cnpj: [null, Validators.required],
      stateRegistration: [
        "",
        [Validators.maxLength(9), Validators.minLength(9)],
      ],
      municipalRegistration: [
        "",
        [Validators.maxLength(9), Validators.minLength(9)],
      ],

      mail: [null, [Validators.email, Validators.required]],
      site: [null, Validators.required],
      name: [null, Validators.required],
      office: [null, Validators.required],
      Phone: this.fb.group({
        phoneNumber: [null],
        ddd: [null],
        ddi: [null],
      }),

      Address: this.fb.group({
        zipCode: [
          null,
          [
            Validators.required,
            Validators.maxLength(8),
            Validators.minLength(8),
          ],
        ],
        street: [null],
        number: [null],
        complement: [null],
        state: [null],
        city: [null],
        site: [null, Validators.required],
      }),
    });
  }
  async saveCustomer() {
    let data = this.customerForm.getRawValue();
    if (this.checkValid()) {
      try {
        const customer = await this.customerProvider.store(data);
        sessionStorage.setItem("customer_id", customer.id);
        this.handleStep(2);
        this.snackbarService.showAlert("Cliente salvo com sucesso");
        this.router.navigate([`cliente/${customer.id}`]); 
        this.customerId = customer.id;
      } catch (error: any) {
        console.log("ERROR 132" + error);
        this.snackbarService.showError("Erro ao salvar o cliente");
      }
    } else {
      this.snackbarService.showAlert("Verifique os campos");
    }
  }

  async saveEditCustomer() {
    let data = this.customerForm.getRawValue();
    if (this.checkValid()) {
      try {
        const customer = await this.customerProvider.update(
          this.customerId,
          data
        );
        this.router.navigate(["cliente/lista"]);
        this.snackbarService.showAlert("Cliente atualizado com sucesso");
      } catch (error) {
        this.snackbarService.showAlert("Erro ao atualizar o cliente");
        console.error(error);
      }
    } else {
      this.snackbarService.showAlert("Verifique os campos");
    }
  }

  handleChanges(value: any): void {}

  handleStep(number: number): void {
    if (!this.checkValid() && this.step < number) {
    } else if (this.step - number < 1) {
      this.step = number;
      sessionStorage.setItem("customer_tab", this.step.toString());
    } else {
      this.step = number;
      sessionStorage.setItem("customer_tab", this.step.toString());
    }
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === "back") {
      this.step -= 1;
    } else if (this.checkValid() && this.step < 8 && direction === "next") {
      this.step += 1;
    } else {
      this.snackbarService.showAlert("Verifique os campos");
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
