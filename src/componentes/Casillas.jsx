export const Casilla = ({children, cambiarValor, index, esSeleccionado}) => {
  const className = `casilla ${esSeleccionado? 'seleccionado': ''}`
  const handleClick = () => {
    if(cambiarValor){
      cambiarValor(index)
    }
  }
  return (
    <div className={className} key={index} onClick={handleClick}>
      <span className='casilla_contenido'>{children}</span>
    </div>
  )
}