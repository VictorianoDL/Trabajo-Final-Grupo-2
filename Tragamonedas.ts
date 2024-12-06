import { Juego } from "./Juego";

export class Tragamonedas extends Juego {
    protected simbolos: string[] = ["🍉", "🍊", "🍋"];
    protected combinacion: string[] = ["Vacio"];
    protected resultado: number;

    constructor(nombre:string,apuestaMinima:number){
        super(nombre,apuestaMinima);  
    }

    public tirar():string{
        this.combinacion = this.generarCombinacionAleatoria();
        this.resultado = this.calcularResultado();
        this.creditosJugador += this.resultado;

        return this.mostrarResultado();
    }
    
    public realizarApuesta(apuesta: number): void {
        if(apuesta >= this.apuestaMinima && apuesta <= this.creditosJugador){        
            this.apuesta = apuesta;
            this.creditosJugador -= apuesta;
        }else{
            if(apuesta < this.apuestaMinima){
                if(apuesta < 0){
                    throw new Error("    <<ERROR>> Numero Ingresado Invalido");
                }else{
                    throw new Error("    <<ERROR>> La apuesta minima es de " + this.apuestaMinima);
                }
                
            }else{
                throw new Error("    <<ERROR>> Su saldo es insuficiente, su saldo es de " + this.creditosJugador);
            }
        }
    }

    public getCombinacion(): string {
        let datos: string = "";
        this.combinacion.forEach((x) => {
            datos += x + " ";
        });
        return "Combinacion: " + datos;
    }

    private calcularResultado(): number {
        let resultado: number = 0;
        let contadorA: number = 0;
        let contadorB: number = 0;
        let contadorC: number = 0;

        this.combinacion.forEach((x) => {
            switch (x) {
                case "🍉":
                    contadorA++;
                    break;
                case "🍊":
                    contadorB++;
                    break;
                case "🍋":
                    contadorC++;
                    break;
            }
        });

        if (contadorA == 3 || contadorB == 3 || contadorC == 3) {
            resultado = this.apuesta * 3;
        } else if (contadorA == 2 || contadorB == 2 || contadorC == 2) {
            resultado = this.apuesta * 2;
        }

        return resultado;
    }

    private generarCombinacionAleatoria(): string[] {
        let combination: string[] = [];
        for (let i = 0; i < 3; i++) {
            const indiceAleatorio = Math.floor(Math.random() * this.simbolos.length);
            combination.push(this.simbolos[indiceAleatorio]);
        }
        return combination;
    }

    private mostrarResultado(): string {
        let gananciaString: string;
        switch (this.resultado) {
            case this.apuesta * 2:
                gananciaString = "GANO - su apuesta se duplica";
                break;
            case this.apuesta * 3:
                gananciaString = "GANO - su apuesta se triplica";
                break;
            default:
                gananciaString = "PERDIO - no obtiene ganancia";
        }
        return `

        =================================
        |    ${this.getCombinacion()}   |
        =================================
        <<<<<${gananciaString}>>>>>

      o Ganancia: ${this.resultado}

    Créditos Totales: ${this.creditosJugador}`;
    }
}
