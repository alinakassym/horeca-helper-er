import {createSlice} from '@reduxjs/toolkit';

export const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    lang: null,
    languages: [
      {
        id: 'ru',
        code: 'ru',
        title: 'Русский',
      },
      {
        id: 'en',
        code: 'en',
        title: 'English',
      },
    ],
    suffix: '',
  },
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
      state.suffix = action.payload === 'en' ? '' : `_${action.payload}`;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLang} = localeSlice.actions;

export default localeSlice.reducer;
