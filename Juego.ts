export abstract class Juego {
    protected nombre: string;
    protected creditosJugador: number = 0;
    protected apuestaMinima: number;
    protected apuesta:number = 0;

    constructor(nombre: string, apuestaMinima: number) {
        this.nombre = nombre;
        this.apuestaMinima = apuestaMinima;
    }

    public getNombre():string{
        return this.nombre;
    }
    public setNombre(nombre:string):void{
        this.nombre = nombre;
    }

    public getCreditos():number{
        return this.creditosJugador;
    }
    public setCreditos(creditos:number):void{
        this.creditosJugador = creditos;
    }

    public getApuestaMinima():number{
        return this.apuestaMinima;
    }
    public setApuestaMinima(apuestaMinima:number):void{
        this.apuestaMinima = apuestaMinima;
    }

    abstract realizarApuesta(apuesta: number): void;
}
