import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class CustomerContactProvider {
  constructor(private apiGateway: ApiGateway) { }

  ngOnInit(): void { }

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get("contacts")
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findOne(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get("contacts/:id", { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findContacts(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get("contacts/findContacts/:id", { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  update(id: string | null, contact: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put("contacts/:id", { id: id }, contact)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  store(contact: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post("contacts", contact)

        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  destroy(contactId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .delete("contacts/" + contactId)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}
