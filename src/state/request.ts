import { createSlice } from '@reduxjs/toolkit'

import { RequestStatus } from '../api/types'
import { getMeals } from './data'
import { RootState } from './store'

interface InitialState {
  requestMealsState: RequestStatus
}

const initialState: InitialState = {
  requestMealsState: RequestStatus.DEFAULT,
}

export const request = createSlice({
  name: 'request',
  initialState,
  reducers: {
    requestMealsState: (state, { payload }) => {
      state.requestMealsState = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMeals.fulfilled, (state) => {
      state.requestMealsState = RequestStatus.SUCCESS
    })
    builder.addCase(getMeals.rejected, (state) => {
      state.requestMealsState = RequestStatus.FAILED
    })
    builder.addCase(getMeals.pending, (state) => {
      state.requestMealsState = RequestStatus.PENDING
    })
  },
})

// Selectors
export const selectMealsRequestState = (state: RootState) => state.request.requestMealsState

// Action creators are generated for each case reducer function
export const { requestMealsState } = request.actions

export default request.reducer
