import { Casilla } from "./Casillas"

export function WinnerModal ({winner, resetarJuego}) {

  if( winner === null ) return null
  const textoGanador = winner === false ? 'Empate :' : `Gano :`

  return (
    <section className='contenedorWinner'>
      <div>
        <h2>  
          {textoGanador}
        </h2>
      </div>
      <Casilla>
        {winner}
      </Casilla>
      <button onClick={resetarJuego}>
        Volver a empezar
      </button>
    </section>
  )
}
