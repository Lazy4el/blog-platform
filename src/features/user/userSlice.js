import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import API from 'Sevrces/API';

const initialState = {
  error: false,
  loading: true,
  userProfile: {},
};

// Авторизация
export const getAuthorization = createAsyncThunk(
  'userSlice/getAuthorization',
  async ({ email, password }, { dispatch }) => {
    return await API.loginUser({ email, password })
      .then((response) => {
        Cookies.set('tokenUser', response.user.token);
        dispatch(setUserProfile(response.user));
      })
      .catch((e) => {
        dispatch(setError(true));
        console.log('userSlice/getAuthorization', e);
      });
  }
);

// Регистрация
export const registredUser = createAsyncThunk(
  'userSlice/registredUser',
  async ({ email, password, username }, { dispatch }) => {
    console.log(email, password, username);
    return await API.setRegistration({ email, password, username })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {});
  }
);

// Проверка авторизации
export const getCurrentUser = createAsyncThunk('userSlice/getCurrentUser', async (_, { dispatch }) => {
  return await API.currentUser()
    .then((response) => {
      dispatch(setLoading(false));
      dispatch(setUserProfile(response.user));
    })
    .catch((e) => {
      dispatch(setUserProfile({}));
    });
});

// Редактирование пользователя
export const getEditeUser = createAsyncThunk(
  'userSlice/getEditeUser',
  async ({ username, email, password, image }, { dispatch }) => {
    return await API.updateUser({ username, email, password, image })
      .then((response) => {
        dispatch(setLoading(false));
        dispatch(setUserProfile(response.user));
      })
      .catch((e) => {
        console.log('userSlice/getEditeUser', e);
        dispatch(setError(true));
      });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.userProfile = {};
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
      state.error = false;
    },
  },
  extraReducers: {
    [getAuthorization.fulfilled]: (state) => {
      state.loading = false;
    },
    [getAuthorization.pending]: (state) => {
      state.loading = true;
    },
    [getAuthorization.rejected]: (state) => {
      state.loading = false;
    },

    [getCurrentUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [getCurrentUser.pending]: (state) => {
      state.loading = true;
    },
    [getCurrentUser.rejected]: (state) => {
      state.loading = false;
    },

    [getEditeUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [getEditeUser.pending]: (state) => {
      state.loading = true;
    },
    [getEditeUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { logOut, setError, setUserProfile, setLoading } = userSlice.actions;
export default userSlice.reducer;
