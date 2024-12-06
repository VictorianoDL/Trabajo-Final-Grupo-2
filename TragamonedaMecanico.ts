import { Tragamonedas } from "./Tragamonedas";

export class TragamonedasMecanico extends Tragamonedas {

    constructor(nombre: string, apuestaMinima: number) {
        super(nombre,apuestaMinima);
    }

    public tirarPalanca(): string {
        return "    La palanca ha sido tirada. ¡Buena suerte!"
    }
}
