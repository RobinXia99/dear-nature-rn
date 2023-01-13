import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'
import { apiClient } from '../api/apiClient'
import { RootState } from './store'

export interface Meal {
  id: string
  title: string
  picture: string
}
interface InitialState {
  count: number
  meals: Meal[]
}

const initialState: InitialState = {
  count: 0,
  meals: [],
}

export const getMeals = createAsyncThunk('counter/fetchMeals', async (_, { dispatch }): Promise<void> => {
  try {
    const response = await apiClient.fetchMeals()
    dispatch(retrievedMeals({ meals: response }))
  } catch (error) {
    console.log('DATA ERROR')
  }
})

export const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updatedCount: (state, { payload }) => {
      state.count = payload
    },
    retrievedMeals: (state, { payload }: PayloadAction<{ meals: Meal[] }>) => {
      state.meals = payload.meals
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  },
})

// Selectors
export const selectCount = (state: RootState) => state.data.count
export const selectMeals = (state: RootState) => state.data.meals

// Action creators are generated for each case reducer function
export const { updatedCount, retrievedMeals } = data.actions

export default data.reducer
