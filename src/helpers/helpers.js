import { format } from 'date-fns';
import { useSelector } from 'react-redux';

export const dateFormat = (date) => {
  return format(new Date(date), 'LLLL d, y');
};

export const checkUser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { username } = useSelector((state) => state.user.userProfile);
  return !!username;
};
