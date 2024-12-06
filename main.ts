import * as readlineSync from 'readline-sync';
import { guardarSaldo, resetearTxt } from './funciones';
import { Casino } from './Casino';
import { JuegoFactory } from './JuegoFactory'
import { Ruleta } from './Ruleta';
import { BlackJack } from './BlackJack';
import { TragamonedasMecanico } from "./TragamonedaMecanico";
import { TragamonedasVirtual } from "./TragamonedaVirtual";

const miFabricaJuegos = new JuegoFactory();

let ruleta = miFabricaJuegos.crearJuego("Ruleta","Ruleta Virtual",100);
let tragamonedasMecanico = miFabricaJuegos.crearJuego("TragamonedasMecanico","Tragamonedas Mecanico Clasico",100);
let tragamonedasVirtual = miFabricaJuegos.crearJuego("TragamonedasVirtual","Tragamonedas Virtual",100);
let blackjack = miFabricaJuegos.crearJuego("Blackjack","Black-Jack",100);

const casino = new Casino("Casino Ayacucho", [ruleta,tragamonedasMecanico,tragamonedasVirtual,blackjack]);

let billeteraJugador:number = 0;
let wile = true;
while(wile){
    billeteraJugador = readlineSync.questionInt("Cuanto dinero tienes? ");
    if(billeteraJugador >= 100){
        wile = false   
    }else{
        console.log("El minimo para entrar son 100 pesos");
    } 
}

resetearTxt(billeteraJugador);

let whilePrincipal:boolean = true;
while(whilePrincipal){
    console.log(`

=======================================================================
=======================================================================
==========================< ${casino.getNombre()} >==========================
=======================================================================
=======================================================================`);

    let opcion = readlineSync.questionInt(`
  ${casino.mostrarJuegos()} 
  
  Tu billetera: ${billeteraJugador}
o-------------------------------------------------------o
|  Elija una opcion:                    0: Salir        |
|                                                       |
| 1: Jugar Ruleta                                       |
| 2: Jugar Tragamonedas                                 |
| 3: Jugar BlackJack                                    |
| 4: Agregar Saldo                                      |
o-------------------------------------------------------o
Ingrese la opcion: `);

    switch (opcion) {
        case 0:
            console.log("Gracias por jugar.");
            whilePrincipal = false;
        break;

        // RULETA
        case 1:
            ruleta.setCreditos(billeteraJugador);
            let whileRuleta = true;
            if(ruleta instanceof Ruleta){

                if(ruleta.getEstado()){

                    while (whileRuleta) {
                        console.log(`Ruleta - ${ruleta.getNombre()} Creditos disponibles: ${ruleta.getCreditos()} `)
                        if( ruleta.getListaNumeros().length>0){
                            let respuesta = readlineSync.question('\n'+"    <<Desea ver los ultimos resultados?>> (si/no): ");
                            if(respuesta === "si"){
                                console.log(ruleta.mostrarUltimoResultado());
                            }
                        }
                        
                                         
    
                        let respuestaNumero = readlineSync.question("Quiere apostar a un numero? (si/no): ").toLowerCase();
                        let numeroApostado;
                        let montoNumero = 0;
                
                        if (respuestaNumero === "si") {
                            numeroApostado = readlineSync.questionInt("Apostar a un numero entre 0 y 36: ");
                            // Verifica si el numero es valido
                            while (numeroApostado < 0 || numeroApostado > 36) {
                                console.log("Número inválido. Debe estar entre 0 y 36.");
                                numeroApostado = readlineSync.questionInt("Apostar a un número entre 0 y 36: ");
                            }
                            montoNumero = readlineSync.questionInt("Ingrese monto de apuesta al numero: ");
                        }
                        let respuestaColor = readlineSync.question("Quiere apostar al color? (si/no): ").toLowerCase();
                        let colorApostado: string | null = null;
                        let montoColor = 0;
                
                        if (respuestaColor === "si") {
                            colorApostado = readlineSync.question("Elija el color (rojo o negro): ").toLowerCase();
                            // Verifica si el color es valido
                            while (colorApostado != "rojo" && colorApostado != "negro") {
                                console.log("Color inválido! El color debe ser rojo o negro.");
                                colorApostado = readlineSync.question("Elija el color (rojo o negro): ").toLowerCase();
                            }
                            montoColor = readlineSync.questionInt("Ingrese monto de apuesta al color: ");
                        }            
                    
                        let totalApuesta = montoNumero + montoColor;
                       
                        if (totalApuesta > ruleta.getCreditos()) {
                            console.log("Saldo insuficiente para realizar la apuesta.");
                             break;
                        }
                    
                        try {
                          ruleta.realizarApuesta(montoNumero || montoColor);
                          const resultado = ruleta.apostarNumeroYColor(montoColor,montoNumero,numeroApostado, colorApostado);
                          console.log(resultado);
    
                        } catch (error) {
                          console.log(error.message);  
                        }
                    
                        if (ruleta.getCreditos() <= 0) {
                            readlineSync.keyInPause('\n' + "Saldo insuficiente, juego terminado!");
                          whileRuleta = false;
                        } else {
                          let continuar = readlineSync.question("Quiere seguir jugando? (si/no): ").toLowerCase();
                          if (continuar !== "si") whileRuleta = false;
                        }
                    }
                
                    guardarSaldo(ruleta.getCreditos(),ruleta.getNombre());
                    billeteraJugador = ruleta.getCreditos();
                }else{
                    let prenderApagar = readlineSync.questionInt('\n'+"    <<La Maquina NO esta encendida, desea prenderla?>> [0:NO] [Cualquier Numero:SI] :");
                    if(prenderApagar !== 0){
                        console.log("Prendiendo Ruleta...");
                        ruleta.prenderApagar();
                    } 
                }  
            }
            
        break;

        // TRAGAMONEDAS
        case 2:
            let whileTragamonedas:boolean = true;
            while(whileTragamonedas){
                let opcionTragamonedas = readlineSync.questionInt(`
    o-------------------------------------------------------o
    |  Elija una opcion:                    0: Salir        |
    |                                                       |
    | 1: Jugar Tragamonedas Mecanico                        |
    | 2: Jugar Tragamonedas Virtual                         |
    o-------------------------------------------------------o
    Ingrese la opcion: `); 
                switch(opcionTragamonedas){
                    case 0:
                        whileTragamonedas = false;
                    break;

                    // TRAGAMONEDAS MECANICO
                    case 1:
                        tragamonedasMecanico.setCreditos(billeteraJugador);
                        let whileTragamonedasMecanico = true;
                        if(tragamonedasMecanico instanceof TragamonedasMecanico){
                            while (whileTragamonedasMecanico) {
                                try{
                                    console.log('\n' +`=======------ ${tragamonedasMecanico.getNombre()} ------======= 
        Su saldo para apostar: ${tragamonedasMecanico.getCreditos()}`);
                                    let montoApuesta = readlineSync.questionInt("    Ingrese su apuesta: ");
                                    tragamonedasMecanico.realizarApuesta(montoApuesta);
                                    console.log('\n' + "    o Su apuesta: " + montoApuesta);
    
                                    // ------------
                                    readlineSync.keyInPause('\n' + "Tire de la Palanca!!!!!");
                                    console.log(tragamonedasMecanico.tirarPalanca());
                                    // ------------
    
                                    console.log(tragamonedasMecanico.tirar());
                                } catch (error) {
                                    console.log(error.message);
                                }
                                let continuar = readlineSync.questionInt('\n'+"    <<Quiere volver a tirar?>> [0:NO] [Culaquier Numero:SI] :");
                                if (continuar == 0){
                                    whileTragamonedasMecanico = false;        
                                }  
                            }
                        }
                        guardarSaldo(tragamonedasMecanico.getCreditos(),tragamonedasMecanico.getNombre());
                        billeteraJugador = tragamonedasMecanico.getCreditos();
                    break; 
                    
                    // TRAGAMONEDAS VIRTUAL
                    case 2:
                        tragamonedasVirtual.setCreditos(billeteraJugador);
                        let whileTragamonedasVirtual = true;
                        if(tragamonedasVirtual instanceof TragamonedasVirtual){
    
                            if(tragamonedasVirtual.getEstado()){
    
                                while (whileTragamonedasVirtual) {
    
                                    try{
                                        
                                        console.log(`=======------ ${tragamonedasVirtual.getNombre()} ------======= 
            Su saldo para apostar: ${tragamonedasVirtual.getCreditos()}`);
    
                                        // debe preguntar si quiere ver el ultimo resultado  ARREGLA-----------------------
                                        if(tragamonedasVirtual.getCombinacion() !== "Combinacion: Vacio "){
                                            let respuesta = readlineSync.questionInt('\n'+"    <<Desea ver la ultima combinacion?>> [0:NO] [Culaquier Numero:SI] :");
                                            if(respuesta !== 0){
                                                console.log(tragamonedasVirtual.getCombinacion());
                                            }
                                        }
    
                                        let montoApuesta = readlineSync.questionInt("    Ingrese su apuesta: ");
                                        tragamonedasVirtual.realizarApuesta(montoApuesta);
                                        console.log('\n' + "    o Su apuesta: " + montoApuesta);
                                        
                                        // ------------
                                        readlineSync.keyInPause('\n' + "¡¡¡¡¡Presione la pantalla para tirar!!!!!");
                                        console.log(tragamonedasVirtual.tocarPantalla());
                                        // ------------
    
                                        console.log(tragamonedasVirtual.tirar());
                    
                                    } catch (error) {
                                        console.log(error.message);
                                    }
                                    let continuar = readlineSync.questionInt('\n'+"    <<Quiere volver a tirar?>> [0:NO] [Culaquier Numero:SI] :");
                                    if (continuar == 0){
                                        whileTragamonedasVirtual = false;        
                                    }
        
                                }
                                guardarSaldo(tragamonedasVirtual.getCreditos(),tragamonedasVirtual.getNombre());
                                billeteraJugador = tragamonedasVirtual.getCreditos();
    
                            }else{
                                let prenderApagar = readlineSync.questionInt('\n'+"    <<La Maquina NO esta encendida, desea prenderla?>> [0:NO] [Culaquier Numero:SI] :");
                                if(prenderApagar !== 0){
                                    console.log("Prendiendo Maquina de Tragamonedas...");
                                    tragamonedasVirtual.prenderApagar();
                                }
                            }
                            
                        }

                        
                    break;
                    
                    default:
                        console.log("Opcion no valida. Por favor, intente nuevamente.");
                        readlineSync.keyInPause('\n' + "Presione cualquier Tecla");     
                    break;   
                }                  
            } 
        break;
        
        // BLACKJACK
        case 3:
            blackjack.setCreditos(billeteraJugador);
            let whileBlackJack = true;
            if(blackjack instanceof BlackJack){
                while (whileBlackJack) {
                    try{

                        console.log('\n' +`=======------ ${blackjack.getNombre()} ------======= 
        Su saldo para apostar: ${blackjack.getCreditos()}`);
                        
                        let montoApuesta = readlineSync.questionInt("    Ingrese su apuesta: ");
                        blackjack.realizarApuesta(montoApuesta);
                        
                        let manoJugador = blackjack.getManoJugador();
                        let manoDealer = blackjack.getManoDealer();
                        let puntajeJugador = 0;
                        let puntajeDealer = 0;
    
                        console.log('\n' + `    [==] Dealer Mano:   ${manoDealer[0]}  ???`);
                        console.log(`    [==] Jugador ${blackjack.toStringMano(manoJugador)}`);
                        console.log('\n' + "------------------JUGADA DEL JUGADOR------------------");
                        let decision = readlineSync.questionInt('\n' + "    <<Quiere otra carta?>>  [0:NO]  [1:SI]  :");
                        while (decision === 1) {
                            blackjack.pushearCartaJugador();
                            manoJugador = blackjack.getManoJugador();
                            console.log(`    [==] Jugador ${blackjack.toStringMano(manoJugador)}`);
                            if (blackjack.sumarMano(manoJugador) <= 21) {
                                decision = readlineSync.questionInt('\n' + "    <<Quiere otra carta?>>  [0:NO]  [1:SI]  :");
                            } else {
                                let valorAs = blackjack.verificarAses(manoJugador);
                                if (valorAs === -1) {
                                    decision = 0;
                                } else {
                                    manoJugador[valorAs] = 1;
                                    console.log("    << Valor de As modificada a 1 >>");
                                }
                            }
                        }
                        console.log('\n' + "-------------------FIN DE LA JUGADA-------------------");
                        puntajeJugador = blackjack.sumarMano(manoJugador);
    
                        if (!(puntajeJugador > 21 || (puntajeJugador === 21 && manoJugador.length === 2))) {
                            console.log('\n' + "------------------JUGADA DEL DEALER------------------" + '\n');
                            decision = 0;
                            while (decision === 0) {
                                puntajeDealer = blackjack.sumarMano(manoDealer);
                                console.log(`    [==] Dealer ${blackjack.toStringMano(manoDealer)}`);
                                if (puntajeDealer <= 21) {
                                    if (puntajeDealer <= 17) {
                                        blackjack.pushearCartaDealer();
                                    } else if (puntajeDealer < puntajeJugador) {
                                        blackjack.pushearCartaDealer();
                                    } else {
                                        decision = 1;
                                    }
                                } else {
                                    let valorAs = blackjack.verificarAses(manoDealer);
                                    if (valorAs === -1) {
                                        decision = 1;
                                    } else {
                                        manoDealer[valorAs] = 1;
                                    }
                                }
                            }
                            console.log('\n' + "-------------------FIN DE LA JUGADA-------------------" + '\n');
                        }
                        console.log(blackjack.checkWinner(puntajeJugador, puntajeDealer));
    
                    } catch (error) {
                        console.log(error.message);
                    }
                    let continuar = readlineSync.questionInt("    <<Quiere jugar otra ronda?>> [0:NO] [Culaquier Numero:SI] :");
                    if (continuar == 0){
                        whileBlackJack = false;        
                    }
                }
            }
            guardarSaldo(blackjack.getCreditos(),blackjack.getNombre());
            billeteraJugador = blackjack.getCreditos();
        break;
        
        // Agregar saldo
        case 4:
            let agregarSaldo = readlineSync.questionInt(" <<Cuanto saldo desea agregar?>> ");
            // Verifica si el numero es valido
            while (agregarSaldo < 0) {
                console.log("Número inválido. Ingrese valor nuevamente.");
                agregarSaldo = readlineSync.questionInt("<<Cuanto saldo desea agregar?>> ");
            }     
            billeteraJugador += agregarSaldo;
            guardarSaldo(billeteraJugador,", se agregaron " + agregarSaldo + " pesos a su billetera.") 
        break;

        default:
            console.log("Opcion no valida. Por favor, intente nuevamente.");
            readlineSync.keyInPause('\n' + "Presione cualquier Tecla");
        break;
    }
}

