import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authReducer';
import filterSlice from './reducers/filterSlice';
export default configureStore({
  reducer:{auth:authSlice,filters:filterSlice}
})