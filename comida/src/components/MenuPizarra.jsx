import PlatoCard from './PlatoCard';
 
const MenuPizarra = ({ menu, onEditar, onEliminar }) => {
  if (menu.length === 0) {
    return (
      <div className="menu-vacio">
        <p>🍴 No hay platos en el menú. ¡Agrega uno para comenzar!</p>
      </div>
    );
  }
 
  return (
    <div className="menu-pizarra">
      {menu.map((plato) => (
        <PlatoCard
          key={plato.idMeal}
          plato={plato}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
};
 
export default MenuPizarra;
