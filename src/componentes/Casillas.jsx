export const Casilla = ({children, cambiarValor, index, esSeleccionado}) => {
    const className = `casilla ${esSeleccionado? 'seleccionado': ''}`
    const handleClick = () => {
      cambiarValor(index)
    }
    return(
      <div className={className} key={index} onClick={handleClick}>
        <span className='casilla_contenido'>{children}</span>
      </div>
    )
  }