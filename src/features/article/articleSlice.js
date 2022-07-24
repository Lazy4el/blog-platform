import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from 'Sevrces/API';

const initialState = {
  error: false,
  loading: false,
  offset: 0,
  limit: 5,
  articlesCount: 0,
  articles: [],
  slug: {},
};

// Получаем статьи
export const getLimitArticles = createAsyncThunk(
  'articleSlice/getLimitArticles',
  async ({ limit, offset }, { dispatch }) => {
    return await API.getArticles(limit, offset)
      .then((response) => {
        dispatch(setArticles(response.articles));
        dispatch(setOffset(offset));
        dispatch(setArticlesCount(response.articlesCount));
      })
      .catch((e) => {
        console.log('articleSlice/getLimitArticles', e);
      });
  }
);

// Получаем статью
export const requestSlug = createAsyncThunk('articleSlice/requestSlug', async (slug, { dispatch }) => {
  return await API.getSlug(slug)
    .then((response) => {
      dispatch(setSlug(response.article));
    })
    .catch((e) => {
      console.log('articleSlice/requestSlug', e);
    });
});

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setArticlesCount: (state, action) => {
      state.articlesCount = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
  },
  extraReducers: {
    [getLimitArticles.fulfilled]: (state) => {
      state.loading = false;
    },
    [getLimitArticles.rejected]: (state) => {
      state.loading = false;
    },
    [getLimitArticles.pending]: (state) => {
      state.loading = true;
    },
  },
});

export const { setArticles, setArticlesCount, setOffset, setSlug } = articleSlice.actions;

export default articleSlice.reducer;
