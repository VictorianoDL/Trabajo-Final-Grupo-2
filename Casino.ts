import { Juego } from "./Juego";

export class Casino{
    private nombre:string;
    private listaJuegos:Juego[];

    public constructor(nombre:string,juegos:Juego[]){
        this.nombre = nombre;
        this.listaJuegos = juegos;
    }

    public getNombre():string{
        return this.nombre
    }
    public setNombre(nombre:string):void{
        this.nombre = nombre;
    }
    public mostrarJuegos():string{
        if(this.listaJuegos.length === 0){
            throw new Error("No hay juegos disponibles");
        }

        let juegos:string = ` ---Lista De Juegos--- `;
        this.listaJuegos.forEach(function(x){
            juegos = juegos + '\n' + "    " + x.getNombre();
        })  
        return juegos
    }
    public agregarJuego(nuevoJuego:Juego):void{
        if(this.listaJuegos.includes(nuevoJuego)){
            throw new Error("El juego ya esta en el casino");
        }

        this.listaJuegos.push(nuevoJuego);
    }
    public eliminarJuego(nombreJuego:string):void{
        let buscarJuego = this.listaJuegos.findIndex(element => element.getNombre() === nombreJuego);
    
        if(buscarJuego === -1){
            throw new Error("El juego no se encuentra en la lista.");
        }
        
        this.listaJuegos = this.listaJuegos.filter(element =>(element.getNombre() !== nombreJuego));
    }
}