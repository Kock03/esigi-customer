import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, NgModel, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigProvider } from 'src/providers/config-provider';
import { CepService } from 'src/services/cep.service';

@Component({
  selector: 'app-customer-register-tab',
  templateUrl: './customer-register-tab.component.html',
  styleUrls: ['./customer-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerRegisterTabComponent implements OnInit {
  @Input('form') customerForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @Input('country') countryControl!: FormControl;


  customerId!: string | null;
  customer!: any;
  addressForm!: FormGroup;
  phoneForm!: FormGroup;
  view!: boolean;
  searchEnabled!: boolean;
  defaultValue: any;
  Country!: any;
  token!: string;
  ddi: any[] = []

  constructor(private cepService: CepService,
    private fb: FormBuilder,
    private configProvider: ConfigProvider,

    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getKeys()
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
        // ] as FormGroup;
        // this.addressForm = addressForm
        // addressForm.controls['cep'].valueChanges.subscribe(res => { });

        const phoneForm = this.customerForm.controls[
          'Phone'
        ] as FormGroup;
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
  async getKeys() {
    let data = {
      key: ["ddi"]
    }
    const arrays = await this.configProvider.findKeys('generic', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.ddi = keyList['ddi'];
    console.log(this.ddi)

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
