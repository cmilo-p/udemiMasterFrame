import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    /* Nombre para utilizar en la vista */
    name: 'espar'
})
export class EsParPipe implements PipeTransform {

    /* El transfor es el valor que se devolvera al usar la pipe */
    transform(value: any) {

        var esPar = "no es par";
        if(value % 2 == 0) {
            esPar = "es un numero par"

        }

        return "El año es: " + value + " y " + esPar;
    }
}
