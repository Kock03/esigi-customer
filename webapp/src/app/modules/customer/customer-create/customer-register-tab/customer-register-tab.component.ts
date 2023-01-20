import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgModel, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigProvider } from 'src/providers/config-provider';
import { CepService } from 'src/services/cep.service';
import { StatesAndCities } from 'src/services/states-cities.service';


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
  cityList: Array<any> = [];
  data!: any;

  constructor(private cepService: CepService,
    private fb: FormBuilder,
    private configProvider: ConfigProvider,
    private statesAndCities: StatesAndCities,
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

  async searchCep() {
    this.data = await this.cepService.searchCep(this.addressForm.controls['cep'].value);
    this.customerForm.controls['Address'].patchValue({
      cep: this.data.cep,
      city: this.data.localidade,
      street: this.data.logradouro,
      state: this.data.uf,
      district: this.data.bairro,
    });
    this.searchCities({ value: this.data.uf })
    if (this.data.erro == true) {
      window.alert('Cep inválido');
    }
  }

  searchCities(e: any) {
    const city = document.querySelector('#cities') as HTMLSelectElement;
    let state_number = this.statesAndCities.json_cities.estados.length;
    let j_index = -1;
    for (var x = 0; x < state_number; x++) {
      if (this.statesAndCities.json_cities.estados[x].sigla == e.value) {
        j_index = x;
      }
    }
    let line = {};
    let arrayCity = Array<any>();
    if (j_index != -1) {
      this.statesAndCities.json_cities.estados[j_index].cidades.forEach(
        cities => {
          line = cities;
          arrayCity.push(line);
        }
      );
      this.cityList = arrayCity;
    } else {
      city.innerHTML = '';
    }
  }
}
