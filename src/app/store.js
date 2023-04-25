import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterReducer from '../components/blogSlice'

import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { blogApi } from '../services/post'

export const store = configureStore({
  reducer: {
    counter : counterReducer,
    [blogApi.reducerPath] : blogApi.reducer
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

setupListeners(store.dispatch)