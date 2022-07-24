import { Button, Popconfirm } from 'antd';
import Cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import classes from 'components/Buttons/Buttons.module.scss';
import { Link, Redirect } from 'react-router-dom';
import { logOut } from 'features/user/userSlice';
import { useLocation } from 'react-router-dom';
import { requestDeleteSlug } from 'features/article/articleSlice';

export const LogOut = () => {
  const { userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    userProfile.username && (
      <Button
        className={classes.LogOut}
        onClick={() => {
          Cookie.remove('tokenUser');
          dispatch(logOut());
        }}
      >
        Log Out
      </Button>
    )
  );
};

export const CreateArticle = () => {
  const { userProfile } = useSelector((state) => state.user);
  return (
    userProfile.username && (
      <Link to={'/new-article'}>
        <Button className={classes.CreateArticle}>Create article</Button>
      </Link>
    )
  );
};

export const SignIn = () => {
  const { userProfile } = useSelector((state) => state.user);
  return (
    !userProfile.username && (
      <Link to={'/sign-in'}>
        <Button className={classes.SignIn}>Sign In</Button>
      </Link>
    )
  );
};

export const SignUp = () => {
  const { userProfile } = useSelector((state) => state.user);
  return (
    !userProfile.username && (
      <Link to={'/sign-up'}>
        <Button className={classes.SignUp}>Sign Up</Button>
      </Link>
    )
  );
};

export const Submit = ({ type, text }) => {
  return (
    <Button className={classes.Buttons__submit} htmlType="submit" type={type}>
      {text}
    </Button>
  );
};

export const DeleteSlug = () => {
  let location = useLocation();
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(requestDeleteSlug(location.pathname));
    <Redirect to={'/'} />;
  };
  const text = 'Are you sure to delete this task?';
  return (
    <Popconfirm placement="left" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button className={classes.DeleteSlug}>Delete</Button>
    </Popconfirm>
  );
};

export const EditeSlug = ({ slug }) => {
  return (
    <Link to={`/articles/${slug}/edit`}>
      <Button className={classes.DeleteSlug}>Edit</Button>
    </Link>
  );
};
