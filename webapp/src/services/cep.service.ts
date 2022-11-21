import { HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { ApiGateway } from 'src/api-gateway';
import { HttpClient } from '@angular/common/http';



@Injectable({

  providedIn: 'root',

})

export class CepService {

  constructor(private apiGateway: ApiGateway, private http: HttpClient) {}



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

  searchCep(cep: any): Promise<any> {
    return new Promise((resolve, reject) => { this.http
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe(data => {
          resolve(data)
        }, reject);
      });
    }

}