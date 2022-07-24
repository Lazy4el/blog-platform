import { useDispatch, useSelector } from 'react-redux';
import { getLimitArticles } from 'features/article/articleSlice';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import PaginationBlog from 'components/PaginationBlog/Pagination';
import classes from 'components/Articles/Articles.module.scss';
import { checkUser } from 'helpers/helpers';

import { Loader } from 'components/Alert/Alret';

import Article from './Article';

const Articles = () => {
  const dispatch = useDispatch();
  const { articles, offset, limit, loading } = useSelector((state) => state.article);
  const authorizationCheck = checkUser();
  useEffect(() => {
    dispatch(getLimitArticles({ authorizationCheck, limit, offset }));
  }, [dispatch, limit, offset, authorizationCheck]);

  return (
    <div className={classes.Articles}>
      {!loading &&
        articles?.map((element) => {
          return <Article key={v4()} article={element}></Article>;
        })}

      <PaginationBlog></PaginationBlog>

      <Loader loading={loading}></Loader>
    </div>
  );
};
export default Articles;
