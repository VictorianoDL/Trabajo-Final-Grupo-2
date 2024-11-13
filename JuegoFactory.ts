import { Juego } from "./Juego";
import { Tragamonedas } from "./Tragamonedas";

class JuegoFactory{
    crearJuego(nombre:string):Juego{
        switch(nombre){
            case "Blackjack": return new Blackjack();
            case "Ruleta": return new Ruleta();
            case "Tragamonedas": return new Tragamonedas("Tragamonedas",1000,10);
            case "TragamonedasMecanico": return new TragamonedasMecanico();
            case "TragamonedasVirtual": return new TragamonedasVirtual();
            default: throw new Error("El juego no existe.");
        }
    }
}
