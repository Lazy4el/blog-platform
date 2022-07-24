import UserInfo from 'components/UserInfo/UserInfo';
import { Link } from 'react-router-dom';
import TagList from 'components/TagList/TagList';
import Favorite from 'components/Favorite/Favorite';
import classes from 'components/Articles/Article.module.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        <div className={`${classes.PostItem__text} ${full ? classes.PostItem__text_full : ''}`}>{description} </div>
      </div>
      {full && (
        <div className={classes.PostItem__body}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      )}
      <UserInfo username={author.username} logoUrl={author.image} date={createdAt} change={change}></UserInfo>
    </div>
  );
};

export default Article;
