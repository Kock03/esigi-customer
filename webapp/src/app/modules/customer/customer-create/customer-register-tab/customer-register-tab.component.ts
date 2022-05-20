import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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


  customerId!: string | null;
  customer!: any;
  addressForm!: FormGroup;
  phoneForm!: FormGroup;

  constructor(private cepService: CepService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');

    if (this.customerId == 'novo') {
      this.customerForm.valueChanges.subscribe(res => {
        const addressForm = this.customerForm.controls[
          'Address'
        ] as FormGroup;
        this.addressForm = addressForm
        // addressForm.controls['cep'].valueChanges.subscribe(res => { });

        const phoneForm = this.customerForm.controls[
          'Phone'
        ] as FormGroup;
        this.phoneForm = phoneForm
        phoneForm.controls['ddi'].valueChanges.subscribe(res => {});
      })
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
      address.cep.replace('-', '')
    );

    if (district.erro) {
      window.alert('Cep inválido');
      this.customerForm.controls['Address'].reset();
    } else {
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
