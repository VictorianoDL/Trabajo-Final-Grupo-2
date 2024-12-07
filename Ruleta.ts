import { IJuegosVirtuales } from "./IJuegosVirtuales";
import { Juego } from "./Juego";

export class Ruleta extends Juego implements IJuegosVirtuales{
    private listaNumeros:number[];
    private prendidoApagado: boolean;

    constructor(nombre: string, apuestaMinima: number) {
        super(nombre, apuestaMinima);
        this.listaNumeros=[];
        this.prendidoApagado = false;
    }

    public getListaNumeros(): number []{ 
        return this.listaNumeros        
    }

    public mostrarUltimoResultado(): string {
        return `Listado de números: ${this.listaNumeros}`;
    }

    public prenderApagar(): void {
        this.prendidoApagado = !this.prendidoApagado;
    }


    public getEstado():boolean{
        return this.prendidoApagado
    }

    private obtenerColor(numero: number): string {
        if (numero === 0) return "sin color"; 
        return numero % 2 === 0 ? "rojo" : "negro";
    }

    private girar(): { numero: number; color: string } {
        const numeroGanador = Math.floor(Math.random() * 37); 
        const colorGanador = this.obtenerColor(numeroGanador);
        this.listaNumeros.push(numeroGanador)
        return { numero: numeroGanador, color: colorGanador };
    }

    public realizarApuesta(montoApuesta: number): void {
        // Validar monto mnimo
        if (montoApuesta < this.apuestaMinima) {
            throw new Error(`La apuesta mínima es de ${this.apuestaMinima}.`);
        }
        // Validar saldo 
        if (montoApuesta > this.creditosJugador) {
            throw new Error(`Saldo insuficiente para realizar la apuesta. Tu saldo actual es de ${this.creditosJugador}.`);
        }
    }

    public apostarNumeroYColor(
        montoColor: number,
        montoNumero:number,
        numeroApostado: number | null,
        colorApostado: string | null
    ): string {
        let montoApuesta = montoColor+montoNumero
        try {
            this.realizarApuesta(montoApuesta);  
        } catch (error) {
            return error.message; // mensaje de error si la apuesta no es valida
        }

        // saldo inicial para comparacion
        const saldoInicial = this.creditosJugador;

        // Descuenta la apuesta del saldo
        this.creditosJugador = this.creditosJugador - montoApuesta;

        // Realiza la tirada
        const resultado = this.girar();
        let ganancia = 0;
        let mensajeResultado = "";

        // Verificar si se aposto a un numero y acerto
        if (numeroApostado !== null && numeroApostado === resultado.numero) {
            ganancia += montoNumero * 35;
            mensajeResultado += "¡Has acertado el número! ";
        }

        // Verificar si aposto a un color y acert0
        if (colorApostado !== null) {
            if (colorApostado.toLowerCase() === resultado.color) {
                ganancia += montoColor *2;  
                mensajeResultado += "¡Has acertado el color! ";
            } else {
                mensajeResultado += `El color ganador es ${resultado.color}. `;
            }
        }

        // Si no hubo aciertos
        if (ganancia === 0) {
            mensajeResultado = `El color ganador es ${resultado.color}. No has ganado esta vez.`;
        }

        // Sumar las ganancias al saldo
        
        this.creditosJugador += ganancia;

        // resultado
        return `
        Número ganador: ${resultado.numero} (${resultado.color})
        ${mensajeResultado}
        Saldo inicial: ${saldoInicial}
        Saldo actual: ${this.creditosJugador}
        `;
    }
}
