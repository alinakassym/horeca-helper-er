import {configureStore} from '@reduxjs/toolkit';
import employeesSlice from './slices/employees';
import localeSlice from './slices/locale';
import authSlice from './slices/auth';

export default configureStore({
  reducer: {
    employees: employeesSlice,
    locale: localeSlice,
    auth: authSlice,
  },
});
