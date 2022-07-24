import { Link } from 'react-router-dom';
import UserInfo from 'components/UserInfo/UserInfo';
import classes from 'components/Profile/Profile.module.scss';

const Profile = ({ userProfile }) => {
  return (
    userProfile.username && (
      <Link to={'/edite-profile'} className={classes.user}>
        <UserInfo username={userProfile.username} logoUrl={userProfile.image}></UserInfo>
      </Link>
    )
  );
};
export default Profile;
