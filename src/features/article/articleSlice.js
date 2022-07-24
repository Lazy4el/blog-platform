import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from 'Sevrces/API';

const initialState = {
  error: false,
  loading: false,
  offset: 0,
  limit: 5,
  articlesPage: 1,
  articlesCount: 0,
  articles: [],
  slug: {},
};

// Получаем статьи
export const getLimitArticles = createAsyncThunk(
  'articleSlice/getLimitArticles',
  async ({ authorizationCheck, limit, offset, page }, { dispatch }) => {
    console.log(authorizationCheck, limit, offset, page);
    return await API.getArticles(authorizationCheck, limit, offset)
      .then((response) => {
        dispatch(setArticles(response.articles));
        dispatch(setOffset(offset));
        !!page && dispatch(setPage(page));
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

// создаем статью
export const requestCreateSlug = createAsyncThunk('articleSlice/createSlug', async (data, { dispatch }) => {
  return await API.createSlug({ data }).catch((e) => {
    console.log('articleSlice/requestSlug', e);
  });
});

// Обновляем статью
export const requestUpdateSlug = createAsyncThunk(
  'articleSlice/requestUpdateSlug',
  async ({ data, slugTitle }, { dispatch }) => {
    return await API.updateSlug({ data, slugTitle })
      .then((response) => {
        dispatch(setSlug(response));
      })
      .catch((e) => {
        console.log('articleSlice/requestUpdateSlug', e);
      });
  }
);

// удаляем статью
export const requestDeleteSlug = createAsyncThunk('articleSlice/requestDeleteSlug', async (path, { dispatch }) => {
  return await API.deleteSlug(path)
    .then(() => {
      dispatch(setSlug({}));
    })
    .catch((e) => {
      console.log('articleSlice/requestDeleteSlug', e);
    });
});

// Лайк статьи
export const favoriteSlug = createAsyncThunk('articleSlice/favoriteSlug', async ({ slug, favorited }, { dispatch }) => {
  return await API.setFavoriteSlug({ slug, favorited })
    .then((response) => {
      dispatch(setFavortie(response));
    })
    .catch((e) => {
      console.log('articleSlice/favoriteSlug', e);
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
    setPage: (state, action) => {
      state.articlesPage = action.payload;
    },
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
    setFavortie: (state, action) => {
      state.articles = state.articles.map((slug) => {
        return slug.slug === action.payload.article.slug ? action.payload.article : slug;
      });
      state.slug = state.slug.slug === action.payload.article.slug ? action.payload.article : state.slug;
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

export const { setArticles, setArticlesCount, setOffset, setSlug, setFavortie, setPage } = articleSlice.actions;

export default articleSlice.reducer;
