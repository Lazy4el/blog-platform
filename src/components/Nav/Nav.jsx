import { LogOut, CreateArticle, SignIn, SignUp } from 'components/Buttons/Buttons';
import { useSelector } from 'react-redux';
import classes from 'components/Nav/Nav.module.scss';
import Profile from 'components/Profile/Profile';

const Nav = () => {
  const { userProfile } = useSelector((state) => state.user);

  return (
    <div className={classes.Nav}>
      <SignIn></SignIn>
      <SignUp></SignUp>
      <CreateArticle></CreateArticle>
      <Profile userProfile={userProfile}></Profile>
      <LogOut></LogOut>
    </div>
  );
};

export default Nav;
