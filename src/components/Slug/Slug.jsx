import { useDispatch, useSelector } from 'react-redux';
import { requestSlug } from 'features/article/articleSlice';
import { useEffect } from 'react';
import classes from 'components/Slug/Slug.module.scss';
import Article from 'components/Articles/Article';
import { Loader } from 'components/Alert/Alret';

const Slug = ({ slugTitle }) => {
  const dispatch = useDispatch();
  const { article, user } = useSelector((state) => state);
  const { slug, loading } = article;
  const { userProfile } = user;

  useEffect(() => {
    if (slugTitle) {
      dispatch(requestSlug(slugTitle));
    }
  }, [dispatch, slugTitle]);

  const isEmpty = Object.keys(slug).length !== 0;

  return (
    <div className={classes.Slug}>
      {!loading && isEmpty ? (
        <Article
          article={slug}
          full={true}
          change={slug.author.username === userProfile.username ? slug.slug : false}
        ></Article>
      ) : null}

      <Loader loading={loading}></Loader>
    </div>
  );
};

export default Slug;
