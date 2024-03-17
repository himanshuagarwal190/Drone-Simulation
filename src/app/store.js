import { configureStore } from '@reduxjs/toolkit'
import drones from "./dronesSlice.js"

export const store = configureStore({
  reducer: {
    drones
  },
})