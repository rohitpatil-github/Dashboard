import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer
  }
})

export default store 