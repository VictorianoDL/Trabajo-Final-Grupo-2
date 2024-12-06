import { Juego } from "./Juego";

export class BlackJack extends Juego{
    private baraja:number[];
    private manoJugador:number[];
    private manoDealer:number[];
    
    constructor(nombre:string,apuestaMinima:number){
        super(nombre,apuestaMinima);
        this.baraja = [2,3,4,5,6,7,8,9,10,10,10,10,11];
        this.apuesta = 0; 
    } 

    private crearMano():void{
        this.manoDealer = [this.baraja[Math.floor(Math.random() * this.baraja.length)],this.baraja[Math.floor(Math.random() * this.baraja.length)]]
        this.manoJugador = [this.baraja[Math.floor(Math.random() * this.baraja.length)],this.baraja[Math.floor(Math.random() * this.baraja.length)]]
    }

    public pushearCartaJugador():void{
        this.manoJugador.push(this.baraja[Math.floor(Math.random() * this.baraja.length)]);   
    }

    public pushearCartaDealer():void{
        this.manoDealer.push(this.baraja[Math.floor(Math.random() * this.baraja.length)]);   
    }

    public sumarMano(mano:number[]):number{
        return mano.reduce((acumulador,x)=> acumulador + x,0);    
    }

    public toStringMano(mano:number[]):string{
        let dato:string = "Mano:  ";
        mano.forEach((x)=>{
            dato += x + "   ";
        })
        return dato + " Total: " + this.sumarMano(mano)
    }

    public getManoJugador():number[]{
        let mano:number[] = this.manoJugador;
        return mano
    }

    public getManoDealer():number[]{
        let mano:number[] = this.manoDealer;
        return mano
    }

    public verificarAses(mano:number[]):number{
        let dato:number = mano.findIndex((element) => element == 11);
        return dato
    }

    public realizarApuesta(apuesta:number):void{
        if(apuesta >= this.apuestaMinima && apuesta <= this.creditosJugador){        
            this.apuesta = apuesta;
            this.crearMano();
        }else{
            if(apuesta < this.apuestaMinima){
                throw new Error("    <<ERROR>> La apuesta minima es de " + this.apuestaMinima);
            }else{
                throw new Error("    <<ERROR>> Su saldo es insuficiente, su saldo es de " + this.creditosJugador);
            }
        }
    }

    public checkWinner(manoJ:number,manoD:number):string{
        let datoFinal:string = "    <<Tu Puntaje>> " + manoJ + "    ||    <<Dealer Puntaje>> " + manoD;
        if(manoJ == 21 && this.manoJugador.length == 2){
            this.creditosJugador += this.apuesta * 3;
            datoFinal = "    <<Tu Puntaje>> " + manoJ + '\n' + "    BLACKJACK!! - GANAS - TU APUESTA DE " + this.apuesta + " SE TRIPLICA"
        }else{
            if(manoJ <= 21){
                if(manoD <= 21){
                    if(manoJ == manoD){
                        datoFinal += '\n' + "    EMPATE"
                    }else{
                        if(manoJ > manoD){
                            this.creditosJugador += this.apuesta * 2;
                            datoFinal += '\n' + "    TU PUNTAJE ES MAYOR - GANAS - TU APUESTA DE " + this.apuesta + " SE DUPLICA"
                        }else{
                            this.creditosJugador = this.creditosJugador - this.apuesta;
                            datoFinal += '\n' + "    TU PUNTAJE ES MENOR - PIERDES"
                        }
                    }
                }else{
                    this.creditosJugador += this.apuesta * 2;
                    datoFinal += '\n' + "    DEALER SE PASO - GANAS - TU APUESTA DE " + this.apuesta + " SE DUPLICA"
                }
            }else{
                this.creditosJugador = this.creditosJugador - this.apuesta;
                datoFinal = "    <<Tu Puntaje>> " + manoJ + '\n' + "    TE PASASTE - PIERDES" 
            }
        }
        this.apuesta = 0;
        return '\n' + datoFinal + '\n' + '\n' + "    <<Tu saldo final>> " + this.creditosJugador
    }
}
