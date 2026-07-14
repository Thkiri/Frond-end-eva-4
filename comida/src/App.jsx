import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MenuPizarra from './components/MenuPizarra';
import { fetchPlatosChilenos } from './services/api';
import './App.css';

function App() {

  const [menu, setMenu] = useState(() => {
    try {
      const saved = localStorage.getItem('cocina_chilena_menu');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error cargando persistencia:', error);
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');


  useEffect(() => {
    localStorage.setItem('cocina_chilena_menu', JSON.stringify(menu));
  }, [menu]);


  const cargarDesdeAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const platos = await fetchPlatosChilenos();

      setMenu((prev) => {
        const idsExistentes = new Set(prev.map((p) => p.idMeal));
        const nuevos = platos.filter((p) => !idsExistentes.has(p.idMeal));
        return [...prev, ...nuevos];
      });
    } catch (err) {
      setError(err.message || 'Error al conectar con la API.');
    } finally {
      setLoading(false);
    }
  };


  const handleAgregarPlato = () => {
    if (!nuevoNombre.trim()) {
      alert(' El nombre del plato no puede estar vacío.');
      return;
    }
    const precioNum = Number(nuevoPrecio);
    if (Number.isNaN(precioNum) || precioNum < 0) {
      alert('Precio inválido. Ingresa un número positivo.');
      return;
    }
    const nuevoPlato = {
      idMeal: `manual_${Date.now()}`,
      strMeal: nuevoNombre.trim(),
      strMealThumb: 'https://www.themealdb.com/images/media/meals/p6hgrj1782851874.jpg',
      precio: precioNum,
      disponible: true,
    };
    setMenu((prev) => [...prev, nuevoPlato]);
    setNuevoNombre('');
    setNuevoPrecio('');
  };


  const handleEditarPrecio = (idMeal, nuevoPrecioNum) => {
    if (Number.isNaN(nuevoPrecioNum) || nuevoPrecioNum < 0) {
      alert(' Precio inválido.');
      return;
    }
    setMenu((prev) =>
      prev.map((plato) =>
        plato.idMeal === idMeal ? { ...plato, precio: nuevoPrecioNum } : plato
      )
    );
  };


  const handleEliminar = (idMeal) => {
    setMenu((prev) => prev.filter((plato) => plato.idMeal !== idMeal));
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
 
        <section className="seccion-api">
          <h2 className="seccion-titulo"> Cargar desde API</h2>
          <button
            className="btn btn-primary"
            onClick={cargarDesdeAPI}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Cargar Platos Chilenos'}
          </button>

          {error && (
            <div className="error-box">
              <p> {error}</p>
              <button className="btn btn-reintentar" onClick={cargarDesdeAPI}>
                 Reintentar
              </button>
            </div>
          )}
        </section>


        <section className="seccion-form">
          <h2 className="seccion-titulo"> Agregar Plato Manual</h2>
          <div className="form-agregar">
            <input
              type="text"
              className="form-input"
              placeholder="Nombre del plato"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
            <input
              type="number"
              className="form-input"
              placeholder="Precio (CLP)"
              value={nuevoPrecio}
              onChange={(e) => setNuevoPrecio(e.target.value)}
              min="0"
            />
            <button className="btn btn-agregar" onClick={handleAgregarPlato}>
              Agregar
            </button>
          </div>
        </section>


        <section className="seccion-menu">
          <h2 className="seccion-titulo">
             Menú Actual{' '}
            <span className="menu-count">({menu.length} platos)</span>
          </h2>
          <MenuPizarra
            menu={menu}
            onEditar={handleEditarPrecio}
            onEliminar={handleEliminar}
          />
        </section>
      </main>
    </div>
  );
}

export default App;