import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
    static oldPasswordInvalid(password: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password.value !== '1234') {
                    resolve({oldPasswordInvalid: true});
                } else {
                    resolve(null);
                }
            }, 2000);
        });
    }
}
