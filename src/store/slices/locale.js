import {createSlice} from '@reduxjs/toolkit';

export const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    lang: null,
  },
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLang} = localeSlice.actions;

export default localeSlice.reducer;
