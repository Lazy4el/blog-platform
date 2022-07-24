import { Avatar } from 'antd';
import { dateFormat } from 'helpers/helpers';
import classes from 'components/UserInfo/UserInfo.module.scss';
import { DeleteSlug, EditeSlug } from 'components/Buttons/Buttons';

const UserInfo = ({ username, logoUrl, date, change }) => {
  return (
    <div className={classes.UserInfo}>
      <div className={classes.UserInfo__description}>
        <p className={classes.UserInfo__name}>{username}</p>
        <p className={classes.UserInfo__date}>{date && dateFormat(date)}</p>
      </div>
      <Avatar size={46} className={classes.UserInfo__avatar} src={logoUrl}></Avatar>

      {change && (
        <div className={classes.UserInfo__buttons}>
          <DeleteSlug />
          <EditeSlug slug={change} />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
