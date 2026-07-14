const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Chile';

export const fetchPlatosChilenos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Error de red: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();

  return data.meals.map((meal) => ({
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    precio: 0,
    disponible: true,
  }));
};