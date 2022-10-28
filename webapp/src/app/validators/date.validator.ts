import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class DateValidator {
    constructor() { }

    static isValidData(): ValidatorFn {
        return (control: AbstractControl): Validators => {
            var data = control.value;
            if (data.length != 10) return { dataNotValid: true };
            if (
                data == '00/00/0000' ||
                data == '11/11/1111' ||
                data == '22/22/2222' ||
                data == '33/33/3333' ||
                data == '44/44/4444' ||
                data == '55/55/5555' ||
                data == '66/66/6666' ||
                data == '77/77/7777' ||
                data == '88/88/8888' ||
                data == '99/99/9999'
            ) {
                return { dataNotValid: true };
            }
            var dia = data.substr(0, 2);
            var barra1 = data.substr(2, 1);
            var mes = data.substr(3, 2);
            var barra2 = data.substr(5, 1);
            var ano = data.substr(6, 4);
            if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return { dataNotValid: true };
            if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return { dataNotValid: true };
            if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return { dataNotValid: true };
            if (ano < 1900) return { dataNotValid: true };
            return true;

        }
    }

}  