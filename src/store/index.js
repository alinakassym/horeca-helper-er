import {configureStore} from '@reduxjs/toolkit';
import employeesSlice from './slices/employees';

export default configureStore({
  reducer: {
    employees: employeesSlice,
  },
});
