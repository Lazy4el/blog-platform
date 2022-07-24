import { InputEmail, InputUsername, InputReapeatPassword, InputPassword, InputAgreement } from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import classes from 'components/SignUp/SignUp.module.scss';
import { Loader, AlertError } from 'components/Alert/Alret';
import { Submit } from 'components/Buttons/Buttons';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registredUser } from 'features/user/userSlice';

const SignUp = () => {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    dispatch(registredUser(data));
    reset();
  };

  return (
    <div className={classes.SignUp}>
      <div className={classes.SignUp__title}>Create new account</div>
      <form className={classes.SignUp__form} onSubmit={handleSubmit(onSubmit)}>
        <InputUsername register={register} errors={errors}></InputUsername>
        <InputEmail register={register} errors={errors}></InputEmail>
        <InputPassword register={register} errors={errors}></InputPassword>
        <InputReapeatPassword register={register} errors={errors} watch={watch}></InputReapeatPassword>
        <Divider className={classes.SignUp__divider}></Divider>
        <InputAgreement register={register} errors={errors}></InputAgreement>
        <Submit type={'primary'} text={'Create'}></Submit>
      </form>
      <div className={classes.SignUp__signIn}>
        Don’t have an account? <Link to={'/sign-in'}>Sign Up.</Link>
      </div>
      <Loader loading={loading}></Loader>
      <AlertError error={error}></AlertError>
    </div>
  );
};

export default SignUp;
