import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'
import { RootState } from './store'

export interface User {
  uid: string | null
  points: number | null
  email: string | null
  nickname: string | null
  region: string | null
}

const initialState: User = {
  uid: null,
  points: null,
  email: null,
  nickname: null,
  region: null,
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    retrievedUser: (state, { payload }: PayloadAction<User>) => {
      state.uid = payload.uid
      state.points = payload.points
      state.email = payload.email
      state.nickname = payload.nickname
      state.region = payload.region
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  },
})

// Selectors
export const selectIsAuthenticated = (state: RootState) => state.user?.uid !== null

// Action creators are generated for each case reducer function
export const { retrievedUser } = user.actions

export default user.reducer
