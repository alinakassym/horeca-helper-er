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
        title_ru: 'Дате',
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
        title_ru: 'Дате',
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
        title_ru: 'Дате',
        key: 'updatedAt',
      },
      {
        title: 'Relevance',
        title_ru: 'Актуальности',
        key: 'relevance',
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
        // age
        ageMin: action.payload.ageMin ? Number(action.payload.ageMin) : null,
        ageMax: action.payload.ageMax ? Number(action.payload.ageMax) : null,

        // experience
        experienceMin: action.payload.experienceMin
          ? Number(action.payload.experienceMin)
          : null,
        experienceMax: action.payload.experienceMax
          ? Number(action.payload.experienceMax)
          : null,

        // salary
        salaryMin: action.payload.salaryMin
          ? Number(action.payload.salaryMin)
          : null,
        salaryMax: action.payload.salaryMax
          ? Number(action.payload.salaryMax)
          : null,

        position: action.payload.position,
        positionId: action.payload.position ? action.payload.position.id : null,
        cityId: action.payload.city ? action.payload.city.id : null,
        city: action.payload.city,
        genderId: action.payload.gender ? action.payload.gender.id : null,
        gender: action.payload.gender,
        scheduleId: action.payload.schedule ? action.payload.schedule.id : null,
        schedule: action.payload.schedule,
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
