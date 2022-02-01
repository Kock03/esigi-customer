import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";

const apiVersion = 'api/v1'

@Injectable({
    providedIn: 'root'
})
export class CustomerProvider {
    constructor(private apiGateway: ApiGateway){
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get('customers').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get( 'customers', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(customer: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put('customers', customer).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(customer: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('customers', customer).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(customer: any): Promise<any> {
      return new Promise((resolve, reject) => {
          this.apiGateway.delete('customers', customer).subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
          }, reject);
      })
    }
}
