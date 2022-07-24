import { InputEmail, InputPassword } from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import { Submit } from 'components/Buttons/Buttons';
import { Link } from 'react-router-dom';
import classes from 'components/SignIn/SignIn.module.scss';
import { Loader, AlertError } from 'components/Alert/Alret';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorization } from 'features/user/userSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    dispatch(getAuthorization(data));
    reset();
  };

  return (
    <div className={classes.SignIn}>
      <div className={classes.SignIn__title}>Sign In</div>
      <form className={classes.SignIn__form} onSubmit={handleSubmit(onSubmit)}>
        <InputEmail register={register} errors={errors} valid={false}></InputEmail>
        <InputPassword register={register} errors={errors} valid={false}></InputPassword>
        <Submit type={'primary'} text={'Login'}></Submit>
      </form>
      <div className={classes.SignIn__signUp}>
        Don’t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
      </div>
      <Loader loading={loading}></Loader>
      <AlertError error={error}></AlertError>
    </div>
  );
};

export default SignIn;
