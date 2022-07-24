import UserInfo from 'components/UserInfo/UserInfo';
import { Link } from 'react-router-dom';
import TagList from 'components/TagList/TagList';
import Favorite from 'components/Favorite/Farvorite';
import classes from 'components/Articles/Article.module.scss';

const Article = ({ article, full, change }) => {
  const { title, slug, favorited, createdAt, description, body, favoritesCount, tagList, author } = article;
  return (
    <div className={classes.PostItem}>
      <div className={classes.PostItem__description}>
        <div className={classes.PostItem__title}>
          <Link to={`/articles/${slug}`}>
            <h3 className={classes.PostItem__titleLink} level={4}>
              {title}
            </h3>
          </Link>
          <Favorite slug={slug} favorited={favorited} favoritesCount={favoritesCount}></Favorite>
        </div>
        <TagList tags={tagList}></TagList>
        <div className={classes.PostItem__text}>{description}</div>
        {full && <div className={classes.PostItem__text}>{body}</div>}
      </div>

      <UserInfo username={author.username} logoUrl={author.image} date={createdAt} change={change}></UserInfo>
    </div>
  );
};

export default Article;
