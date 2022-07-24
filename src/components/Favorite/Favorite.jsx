import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { checkUser } from 'helpers/helpers';
import { favoriteSlug } from 'features/article/articleSlice';
import { useDispatch } from 'react-redux';
import classes from 'components/Favorite/Favorite.module.scss';

const Favorite = ({ slug, favorited, favoritesCount }) => {
  const dispatch = useDispatch();
  const user = checkUser();
  const hundelFavorite = () => {
    dispatch(favoriteSlug({ slug, favorited }));
  };
  return (
    <div className={classes.Farvorite}>
      <Button type="text" disabled={!user} onClick={hundelFavorite}>
        {favorited ? <HeartFilled style={{ color: '#FF0707' }} /> : <HeartOutlined />} {favoritesCount}
      </Button>
    </div>
  );
};

export default Favorite;
