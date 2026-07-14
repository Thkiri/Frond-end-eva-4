import { useState } from 'react';

const PlatoCard = ({ plato, onEditar, onEliminar }) => {
  const [editando, setEditando] = useState(false);
  const [nuevoPrecio, setNuevoPrecio] = useState(plato.precio);

  const handleGuardar = () => {
    const precioNum = Number(nuevoPrecio);
    if (Number.isNaN(precioNum) || precioNum < 0) {
      alert(' Precio inválido. Ingresa un número positivo.');
      return;
    }
    onEditar(plato.idMeal, precioNum);
    setEditando(false);
  };

  const handleCancelar = () => {
    setNuevoPrecio(plato.precio);
    setEditando(false);
  };

return (
    <div className={`plato-card ${!plato.disponible ? 'no-disponible' : ''}`}>
      <img
        src={plato.strMealThumb}
        alt={plato.strMeal}
        className="plato-img"
      />
      <div className="plato-info">
        <h3 className="plato-nombre">{plato.strMeal}</h3>
 
        <span className={`plato-badge ${plato.disponible ? 'badge-disponible' : 'badge-agotado'}`}>
          {plato.disponible ? 'Disponible' : 'Agotado'}
        </span>
 
        <div className="plato-precio-bloque">
          {editando ? (
            <div className="precio-edit">
              <input
                type="number"
                value={nuevoPrecio}
                onChange={(e) => setNuevoPrecio(e.target.value)}
                className="precio-input"
                min="0"
                placeholder="Nuevo precio"
              />
              <div className="precio-acciones">
                <button className="btn btn-guardar" onClick={handleGuardar}>
                  Guardar
                </button>
                <button className="btn btn-cancelar" onClick={handleCancelar}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <p className="plato-precio">
              ${plato.precio.toLocaleString('es-CL')}
            </p>
          )}
        </div>
 
        <div className="plato-acciones">
          {!editando && (
            <button className="btn btn-editar" onClick={() => setEditando(true)}>
               Editar Precio
            </button>
          )}
          <button className="btn btn-eliminar" onClick={() => onEliminar(plato.idMeal)}>
             Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

 
export default PlatoCard;
