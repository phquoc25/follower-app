import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {
    static cannotContainSpace(formControl: AbstractControl): ValidationErrors | null {
        if ((formControl.value as string).indexOf(' ') >= 0) {
            return {cannotContainSpace: true};
        }
        return null;
    }

    static isAlreadyInUsed(formControl: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (formControl.value === 'phquoc25') {
                    resolve({isAlreadyInUsed: true});
                } else {
                    resolve(null);
                }
            }, 2000);
        });
    }
}
