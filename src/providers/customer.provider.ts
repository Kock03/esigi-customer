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

    getCustomerList(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get('customer').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
                // this.snackBar.successMessage(response.body.message);
            }, reject);
        });
    }

    getCustomer(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get( 'customer', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
                // this.snackBar.successMessage(response.body.message);
            }, reject);
        });
    }

    findCustomer(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get( `customer/find?${query}`).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
                // this.snackBar.successMessage(response.body.message);
            }, reject);
        });
    }

    findAuthor(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get( `customer/findAuthor?${query}`).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
                // this.snackBar.successMessage(response.body.message);
            }, reject);
        });
    }

    validateRegister(customerDetail: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('customer', customerDetail).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
                // this.snackBar.successMessage(response.body.message);
            }, reject);
        });
    }

    editDomain(customerDetail: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put('customer', customerDetail).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
                // this.snackBar.successMessage(response.body.message);
            }, reject);
        });
    }

    saveDomain(customerDetail: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('customer', customerDetail).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
                // this.snackBar.successMessage(response.body.message);
            }, reject);
        });
    };

    whoIs(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('customer', { domain: name }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
                // this.snackBar.successMessage(response.body.message);
            }, reject);
        });
    }
}
