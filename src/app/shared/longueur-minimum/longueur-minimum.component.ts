import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator {
    static longueurMinimum(valeurMinimum:number): ValidatorFn {
        //Sous ANGULAR dans les validateurs pour indiquer un succès indique NULL
        return (longueur: AbstractControl): { [key: string]: boolean } | null => {
            if (longueur.value != null && longueur.value.trim().length>=valeurMinimum){
                return null;
            }
            return {'plageInvalide':true};
        };

    }
}