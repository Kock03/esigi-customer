import { HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { ApiGateway } from 'src/api-gateway';



@Injectable({

  providedIn: 'root',

})

export class CepService {

  constructor(private apiGateway: ApiGateway) {}



  ngOnInit(): void {}



  findDistrict(cepCode: string): Promise<any> {

    return new Promise((resolve, reject) => {

      this.apiGateway

        .get(`street/${cepCode}`, false, 'ms-cep')

        .subscribe((response: HttpResponse<any>) => {

          resolve(response.body);

        }, reject);

    });

  }

}