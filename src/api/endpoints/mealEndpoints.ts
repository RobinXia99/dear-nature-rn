import { Meal } from '../../state/data'
import { apiInstance } from '../apiInstance'

const fetchMeals = async (): Promise<Meal[]> => {
  const result = await apiInstance.get(`api/rest/meal-roulette-app/meals`)
  return result.data.meal_roulette_app_meals
}

export const mealEndpoints = {
  fetchMeals,
}
