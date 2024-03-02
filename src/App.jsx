import { useEffect, useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Casilla } from './componentes/Casillas'
import { TURNS } from './constantes'
import { hayGanador, juegoTerminado } from './logic/board'
import { WinnerModal } from './componentes/WinnerModal'
import { Puntaje } from './componentes/Puntaje'



function App() {
  const [board, setBoard] = useState(() => {
    const boardGuardado = window.localStorage.getItem('board')
    return (boardGuardado && !hayGanador(JSON.parse(boardGuardado)) && !juegoTerminado(JSON.parse(boardGuardado)))
      ? JSON.parse(boardGuardado)
      : Array(9).fill(null)
  })
  const [turno, setTurno] = useState(() => {
    const turnoGuardado = window.localStorage.getItem('turno')
    return (turnoGuardado) ? JSON.parse(turnoGuardado) : TURNS.O
  })
  const [winner, setWinner] = useState(null)
  const [puntaje, setPuntaje] = useState({ x: 0, o: 0})
  const resetarJuego = () => {
    setBoard(Array(9).fill(null))
    setTurno(TURNS.O)
    setWinner(null)
    sumarPuntos()
  }
  const reiniciarJuego = () => {
    setBoard(Array(9).fill(null))
    setTurno(TURNS.O)
    setWinner(null)
    setPuntaje({ x: 0, o: 0})
  }
  const cambiarValor = (index) => {
    if( board[index] || winner ) return

    const nuevoBoard = [...board]
    nuevoBoard[index] = turno
    setBoard(nuevoBoard)

    const nuevoTurno = (turno === TURNS.x)? TURNS.O : TURNS.x  
    setTurno(nuevoTurno)

    window.localStorage.setItem('board', JSON.stringify(nuevoBoard))
    window.localStorage.setItem('turno', JSON.stringify(nuevoTurno))
    
    const nuevoGanador = hayGanador(nuevoBoard)
    if(nuevoGanador){
      confetti()
      setWinner(nuevoGanador)
    }else if(juegoTerminado(nuevoBoard)){
      setWinner(false)
    }
  }
  const sumarPuntos = () => {
    const PX = puntaje.x
    const PO = puntaje.o
    if(winner === '❌'){
      setPuntaje({ x: PX+1, o: PO})
    }else if(winner === '🔴'){
      setPuntaje({ x: PX, o: PO+1})
    }
  }
  return (
    <>
      <main>
        <h1>
          🔴 Tic Tac Toe ❌
        </h1>
        <button onClick={reiniciarJuego}> 
          Resetear
        </button>
        <section className='game'>
          {
            board.map( ( text,index )  => {
              return(
                <Casilla 
                  key={index}
                  index={index}
                  cambiarValor={cambiarValor}
                >
                  {text}
                </Casilla>
              )
            })
          }
        </section>
        <section className='turno'>
          <Puntaje esSeleccionado={turno === '❌'} valor={puntaje.x}>
            {TURNS.x}
          </Puntaje>
          <Puntaje esSeleccionado={turno === '🔴'} valor={puntaje.o}>
            {TURNS.O}
          </Puntaje>
        </section>
        <section className='descripcion'>
          <h3>¿ Como se juega ?</h3>
          <p>
            Se juega en un tablero de casillas de 3x3. Para ganar, sé el primer jugador en conseguir 3 en raya ( en sentido horizontal, vertical o diagonal ).
          </p>
          <p> 
            Si juegas con la X, tu rival jugará con el O, o viceversa. La partida termina una vez que no queda ninguna casilla libre.
          </p>
        </section>
        <WinnerModal winner={winner} resetarJuego={resetarJuego}/>
      </main>
    </>
  )
}

export default App
