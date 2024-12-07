import { Juego } from "./Juego";
import { Ruleta } from './Ruleta';
import { BlackJack } from './BlackJack';
import { TragamonedasMecanico } from "./TragamonedaMecanico";
import { TragamonedasVirtual } from "./TragamonedaVirtual";

export class JuegoFactory{
    crearJuego(tipoJuego:string,nombre:string,apuestaMinima:number):Juego{
        switch(tipoJuego){
            case "Blackjack": return new BlackJack(nombre,apuestaMinima);
            case "Ruleta": return new Ruleta(nombre,apuestaMinima);
            case "TragamonedasMecanico": return new TragamonedasMecanico(nombre,apuestaMinima);
            case "TragamonedasVirtual": return new TragamonedasVirtual(nombre,apuestaMinima,true);
            default: throw new Error("Juego no soportado.");
        }
    }
}


