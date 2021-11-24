import {configureStore} from '@reduxjs/toolkit';
import employeesSlice from './slices/employees';
import authSlice from './slices/auth';

export default configureStore({
  reducer: {
    employees: employeesSlice,
    auth: authSlice,
  },
});
