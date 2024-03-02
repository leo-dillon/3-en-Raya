export const Puntaje = ({children, index, esSeleccionado, valor }) => {
    const className = `puntaje ${esSeleccionado? 'seleccionado': ''}`
    return (
      <div className={className} key={index}>
        <span className='casilla_contenido'>{children}</span>
        <span className="numero">{valor}</span>
      </div>
    )
  }