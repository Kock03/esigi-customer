
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';


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
}
