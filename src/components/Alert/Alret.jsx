import { Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import classes from 'components/Alert/Alret.module.scss';

export const AlertError = ({ error }) => {
  return (
    error && (
      <Alert
        className={classes.Alert}
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        showIcon
        closable
      />
    )
  );
};

export const Loader = ({ loading }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 46 }} spin />;
  return loading && <Spin className={classes.Alert} indicator={antIcon} />;
};
