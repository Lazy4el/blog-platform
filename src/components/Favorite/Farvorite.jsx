import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { checkUser } from 'helpers/helpers';
import { favoriteSlug } from 'features/article/articleSlice';
import { useDispatch } from 'react-redux';

const Favorite = ({ slug, favorited, favoritesCount }) => {
  const dispatch = useDispatch();
  const user = checkUser();
  const hundelFavorite = () => {
    dispatch(favoriteSlug({ slug, favorited }));
  };
  return (
    <div>
      <Button type="text" disabled={!user} onClick={hundelFavorite}>
        {favorited ? <HeartFilled /> : <HeartOutlined />} {favoritesCount}
      </Button>
    </div>
  );
};

export default Favorite;
