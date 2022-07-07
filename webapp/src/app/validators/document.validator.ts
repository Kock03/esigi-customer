import { Injectable } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    ValidatorFn,
    Validators,
} from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class DocumentValidator {
    constructor() { }

    static isValidCpf(): ValidatorFn {
        return (control: AbstractControl): Validators => {
            const cpf = control.value;
            if (cpf) {
                let numbers, digits, sum, i, result, equalDigits;
                equalDigits = 1;
                if (cpf.length < 11) {
                    return false;
                }

                for (i = 0; i < cpf.length - 1; i++) {
                    if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                        equalDigits = 0;
                        break;
                    }
                }

                if (!equalDigits) {
                    numbers = cpf.substring(0, 9);
                    digits = cpf.substring(9);
                    sum = 0;
                    for (i = 10; i > 1; i--) {
                        sum += numbers.charAt(10 - i) * i;
                    }

                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(0))) {
                        return { cpfNotValid: true };
                    }
                    numbers = cpf.substring(0, 10);
                    sum = 0;

                    for (i = 11; i > 1; i--) {
                        sum += numbers.charAt(11 - i) * i;
                    }
                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(1))) {
                        return { cpfNotValid: true };
                    }
                    return false;
                } else {
                    return { cpfNotValid: true };
                }
            }
            return true;
        };
    }

    static isValidCnpj(): ValidatorFn {
        return (control: AbstractControl): Validators => {
            const cnpj = control.value;
            if (cnpj) {
                let size = cnpj.length - 2;
                let numbers = cnpj.substring(0, size);
                let digits = cnpj.substring(size);
                let sum = 0;
                let pos = size - 7;
                let i = 0;

                if (cnpj.length != 14) {
                    return false;
                }

                if (
                    cnpj == '00000000000000' ||
                    cnpj == '11111111111111' ||
                    cnpj == '22222222222222' ||
                    cnpj == '33333333333333' ||
                    cnpj == '44444444444444' ||
                    cnpj == '55555555555555' ||
                    cnpj == '66666666666666' ||
                    cnpj == '77777777777777' ||
                    cnpj == '88888888888888' ||
                    cnpj == '99999999999999'
                ) {
                    return { cnpjNotValid: true };
                }

                for (i = size; i >= 1; i--) {
                    sum += numbers.charAt(size - i) * pos--;
                    if (pos < 2) pos = 9;
                }
                var result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
                if (result != digits.charAt(0)) {
                    return { cnpjNotValid: true };
                }
                size = size + 1;
                numbers = cnpj.substring(0, size);
                sum = 0;
                pos = size - 7;
                for (i = size; i >= 1; i--) {
                    sum += numbers.charAt(size - i) * pos--;
                    if (pos < 2) pos = 9;
                }
                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
                if (result != digits.charAt(1)) {
                    {
                        cnpjNotValid: true;
                    }
                }
                return false;
            }
            return true;
        };
    }
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
