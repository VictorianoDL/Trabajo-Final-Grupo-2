import * as fs from 'fs';

export function guardarSaldo(saldo: number, nombreJuego: string): void {
    let registro = `- Saldo acumulado: ${saldo}, ${nombreJuego}\n`; 
    try {
        fs.appendFileSync('saldo.txt', registro, 'utf8'); 
    } catch (error) {
        console.error('Error al guardar el saldo en el archivo:', error);
    }
}
export function resetearTxt(saldo:number):void{
    let registro:string = "Saldo Inicial: " + saldo + '\n';
    try {
        fs.writeFileSync('saldo.txt', registro, 'utf8')
    } catch (error) {
        console.error('Error al resetear el archivo:', error);
    }    
}
