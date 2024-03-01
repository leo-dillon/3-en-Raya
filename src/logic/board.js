import { opcionesGanadoras} from '../constantes.js'
export  const hayGanador = (boardCheck) => {
    for(const combo of opcionesGanadoras){
      const [a,b,c] = combo
      if(
        boardCheck[a] &&
        boardCheck[a] === boardCheck[b] &&
        boardCheck[a] === boardCheck[c]
      ){
        return boardCheck[a]
      }
    }
    return null
}
export const juegoTerminado = (nuevoBoard) => {
    return nuevoBoard.every(posicion => posicion !== null)
}