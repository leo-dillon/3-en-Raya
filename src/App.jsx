import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Casilla } from './componentes/Casillas'
import { TURNS } from './constantes'
import { hayGanador, juegoTerminado } from './logic/board'
import { WinnerModal } from './componentes/WinnerModal'



function App() {
  const [board, setBoard] = useState(() => {
    const boardGuardado = window.localStorage.getItem('board')
    return (boardGuardado && !hayGanador(JSON.parse(boardGuardado))&&!juegoTerminado(JSON.parse(boardGuardado)))
      ? JSON.parse(boardGuardado)
      : Array(9).fill(null)
  })
  const [turno, setTurno] = useState(() => {
    const turnoGuardado = window.localStorage.getItem('turno')
    return (turnoGuardado) ? JSON.parse(turnoGuardado) : TURNS.O
  })
  const [winner, setWinner] = useState(null)
  const resetarJuego = () => {
    setBoard(Array(9).fill(null))
    setTurno(TURNS.O)
    setWinner(null)
  }
  const cambiarValor = (index) => {
    if(board[index] || winner)return

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
  return (
    <>
      <main>
        <h1>
          3 en Raya
        </h1>
        <section className='game'>
          {
            board.map( ( a,index )  => {
              return(
              <Casilla 
                key={index}
                index={index}
                cambiarValor={cambiarValor}
                >
                {a}
              </Casilla>
              )
            })
          }
        </section>
        <section className='turno'>
          <Casilla esSeleccionado={turno === '❌'}>
            {TURNS.x}
          </Casilla>
          <Casilla esSeleccionado={turno === '🔴'}>
            {TURNS.O}
          </Casilla>
        </section>
        <WinnerModal winner={winner} resetarJuego={resetarJuego}/>
      </main>
    </>
  )
}

export default App
