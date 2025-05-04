import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isCPF',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: string) {
                    const cleaned = value.replace(/[^\d]+/g, '');

                    if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) return false;

                    let sum = 0;
                    for (let i = 0; i < 9; i++) {
                        sum += parseInt(cleaned.charAt(i)) * (10 - i);
                    }

                    let rev = 11 - (sum % 11);
                    if (rev === 10 || rev === 11) rev = 0;
                    if (rev !== parseInt(cleaned.charAt(9))) return false;

                    sum = 0;
                    for (let i = 0; i < 10; i++) {
                        sum += parseInt(cleaned.charAt(i)) * (11 - i);
                    }

                    rev = 11 - (sum % 11);
                    if (rev === 10 || rev === 11) rev = 0;
                    return rev === parseInt(cleaned.charAt(10));
                },
                defaultMessage(args: ValidationArguments) {
                    return 'CPF inválido';
                },
            },
        });
    };
}
