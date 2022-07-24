import { useDispatch, useSelector } from 'react-redux';
import { getLimitArticles } from 'features/article/articleSlice';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import PaginationBlog from 'components/PaginationBlog/Pagination';
import classes from 'components/Articles/Articles.module.scss';
import { checkUser } from 'helpers/helpers';

import Article from './Article';

const Articles = () => {
  const dispatch = useDispatch();
  const { articles, offset, limit } = useSelector((state) => state.article);
  const authorizationCheck = checkUser();

  useEffect(() => {
    dispatch(getLimitArticles({ authorizationCheck, limit, offset }));
  }, [dispatch, limit, offset, authorizationCheck]);

  return (
    <div className={classes.Articles}>
      {articles?.map((element) => {
        return <Article key={v4()} article={element}></Article>;
      })}

      <PaginationBlog></PaginationBlog>
    </div>
  );
};
export default Articles;
