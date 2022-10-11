import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form, UntypedFormBuilder, UntypedFormGroup, NgModel, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CepService } from 'src/services/cep.service';

@Component({
  selector: 'app-customer-register-tab',
  templateUrl: './customer-register-tab.component.html',
  styleUrls: ['./customer-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerRegisterTabComponent implements OnInit {
  @Input('form') customerForm!: UntypedFormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @Input('country') countryControl!: FormControl;


  customerId!: string | null;
  customer!: any;
  addressForm!: UntypedFormGroup;
  phoneForm!: UntypedFormGroup;
  view!: boolean;
  searchEnabled!: boolean;
  defaultValue: any;
  Country!: any;
  token!: string;

  constructor(private cepService: CepService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.searchEnabled = false;
    this.customerId = this.route.snapshot.paramMap.get('id');

    if (this.customerId == 'novo') {
      this.view = true;
      this.customerForm.valueChanges.subscribe(res => {
        const addressForm = this.customerForm.controls[
          'Address'
        ] as FormGroup;
        this.addressForm = addressForm;
        addressForm.controls['cep'].valueChanges.subscribe(res => { });

        // const addressForm = this.customerForm.controls[
        //   'Address'
        // ] as UntypedFormGroup;
        // this.addressForm = addressForm
        // addressForm.controls['cep'].valueChanges.subscribe(res => { });

        const phoneForm = this.customerForm.controls[
          'Phone'
        ] as UntypedFormGroup;
        this.phoneForm = phoneForm
        phoneForm.controls['ddi'].valueChanges.subscribe(res => { });
      })
    } else {
      this.view = false;
    }

    this.defaultValue = {
      name: sessionStorage.getItem('country_value'),
      alpha2Code: sessionStorage.getItem('flag_value')

    };
  }

  onCountrySelected(country: any) {
    console.log(country)
    if (this.customerId == 'novo') {
      if (country.name === 'Brasil') {
        this.view = true;
        this.searchEnabled = true;
      } else {
        this.view = false;
        this.searchEnabled = false;
      }

      this.customerForm.controls['Address'].patchValue(
        {
          country: country.name,
          flag: country.alpha2Code
        }
      )
    } else {
      this.defaultValue = {
        name: country.name,
        alpha2Code: country.alpha2Code

      };
      console.log(this.defaultValue + " d")
      this.customerForm.controls['Address'].patchValue(
        {
          country: this.defaultValue.name,
          flag: this.defaultValue.alpha2Code
        }
      )
    }
  }

  ngAfterViewInit() {

  }

  next() {
    this.onChange.next(true);
  }

  async getAddress() {
    const address = this.customerForm.controls['Address'].value;
    const district = await this.cepService.findDistrict(
      address.zipCode.replace('-', '')
    );

    if (district.erro) {
      window.alert('Cep inválido');
      this.customerForm.controls['Address'].reset();
      this.view = true;
    } else {
      this.view = false;
      this.customerForm.controls['Address'].patchValue({
        zipCode: district.cep,
        city: district.localidade,
        street: district.logradouro,
        state: district.uf,
        district: district.bairro,
      });
    }
  }
}
