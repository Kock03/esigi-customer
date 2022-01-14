import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
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


  constructor(private cepService: CepService){}

  ngOnInit(): void {
  }

  next() {
    this.onChange.next(true);
  }

  async getAddress() {

    const address = this.customerForm.controls['Address'].value;

    console.log(address.zipCode);

    const district = await this.cepService.findDistrict(

      address.zipCode.replace('-', '')

    );

    console.log(

      '🚀 ~ file: collaborator-register-tab.component.ts ~ line 75 ~ CollaboratorRegisterTabComponent ~ getAddress ~ district',

      district

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

        // district: district.bairro

      });

    }

  }
}
