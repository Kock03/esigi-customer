import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ConfigProvider {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    findKeys(context: any, key: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post(environment.CONFIG_MS + 'list/' + context + 'key', key)
            .subscribe((response: HttpResponse<any>) => {

                    resolve(response.body);
                }, reject);
        });
    }
}