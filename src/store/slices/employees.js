import {createSlice} from '@reduxjs/toolkit';

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    filterReset: {
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
      orderBy: {
        title: 'Date',
        key: 'updatedAt',
      },
      sortOrder: 'DESC',
      pageSize: 10,
      pageNum: 1,
    },
    filter: {
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
      orderBy: {
        title: 'Date',
        key: 'updatedAt',
      },
      sortOrder: 'DESC',
      pageSize: 10,
      pageNum: 1,
    },
    isFilterApplied: false,
    sortBy: [
      {
        title: 'Date',
        key: 'updatedAt',
      },
      {
        title: 'Relevance',
        key: 'relevance',
      },
      {
        title: 'Salary',
        key: 'salary',
      },
    ],
  },
  reducers: {
    setEmployeesFilter: (state, action) => {
      const sortOrder =
        action.payload.orderBy && action.payload.orderBy.key === 'salary'
          ? 'ASC'
          : 'DESC';
      state.filter = {
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
        sortBy: action.payload.orderBy
          ? action.payload.orderBy.key
          : 'updatedAt',
        orderBy: action.payload.orderBy,
        sortOrder: sortOrder,
        pageSize: 10,
        pageNum: 1,
      };
    },
    setFilterApplied: (state, action) => {
      state.isFilterApplied = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setEmployeesFilter, setFilterApplied} = employeesSlice.actions;

export default employeesSlice.reducer;
