import { Tragamonedas } from "./Tragamonedas";
import { IJuegosVirtuales } from "./IJuegosVirtuales";

export class TragamonedasVirtual extends Tragamonedas implements IJuegosVirtuales {
    private efectosSonido: boolean;
    private prendidoApagado: boolean;

    constructor(nombre: string, apuestaMinima: number, efectosSonido: boolean) {
        super(nombre,apuestaMinima);
        this.efectosSonido = efectosSonido;
        this.prendidoApagado = false;
    }

    public getEstado():boolean{
        return this.prendidoApagado
    }
    public getEfectoSonido():string{
        if(this.efectosSonido){
            return "Reproduciendo Efectos de Sonido"
        }else{
            return "Esta Maquina no tiene Efectos de Sonido"
        }
         
    }

    public tocarPantalla(): string {
        return "     Girando Rollos...  ¡Buena suerte!"
    }

    public getCombinacionArray():string[]{
        let x = this.combinacion;
        return x        
    }

    public prenderApagar(): void {
        this.prendidoApagado = !this.prendidoApagado;
    }

    public mostrarUltimoResultado(): string {
        return `Último resultado: ${this.combinacion}`;
    }
}

