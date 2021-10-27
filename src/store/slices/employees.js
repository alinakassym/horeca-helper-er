import {createSlice} from '@reduxjs/toolkit';

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    filter: {
      test: '',
      positionId: null,
      position: null,
      cityId: null,
      city: null,
      ageMin: null,
      ageMax: null,
      genderId: null,
      gender: null,
      experienceMin: null,
      experienceMax: null,
      scheduleId: null,
      schedule: null,
      salaryMin: null,
      salaryMax: null,
      sortBy: 'updatedAt',
      sortOrder: 'DESC',
      pageSize: 10,
      pageNum: 1,
    },
  },
  reducers: {
    setEmployeesFilter: (state, action) => {
      state.filter = {
        test: action.payload.test,
        position: action.payload.position,
        positionId: action.payload.position ? action.payload.position.id : null,
        cityId: action.payload.city ? action.payload.city.id : null,
        city: action.payload.city,
        ageMin: action.payload.ageMin,
        ageMax: action.payload.ageMax,
        genderId: action.payload.gender ? action.payload.gender.id : null,
        gender: action.payload.gender,
        experienceMin: action.payload.experienceMin,
        experienceMax: action.payload.experienceMax,
        scheduleId: action.payload.schedule ? action.payload.schedule.id : null,
        schedule: action.payload.schedule,
        salaryMin: action.payload.salaryMin,
        salaryMax: action.payload.salaryMax,
        sortBy: 'updatedAt',
        sortOrder: 'DESC',
        pageSize: 10,
        pageNum: 1,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {setEmployeesFilter} = employeesSlice.actions;

export default employeesSlice.reducer;
