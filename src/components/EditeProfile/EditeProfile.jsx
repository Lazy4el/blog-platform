import { InputEmail, InputUsername, InputPassword, InputUrl } from 'components/Input/Input';
import classes from 'components/EditeProfile/EditeProfile.module.scss';
import { Loader, AlertError } from 'components/Alert/Alret';
import { Submit } from 'components/Buttons/Buttons';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getEditeUser } from 'features/user/userSlice';

const EditeProfile = () => {
  const { userProfile, loading, error } = useSelector((state) => state.user);
  const { username, email, image } = userProfile;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    if (!data.image) {
      data.image = image;
    }
    dispatch(getEditeUser(data));
    reset();
  };
  return (
    <div className={classes.EditeProfile}>
      <div className={classes.EditeProfile__title}>Edit Profile</div>
      <form className={classes.EditeProfile__form} onSubmit={handleSubmit(onSubmit)}>
        <InputUsername register={register} errors={errors} value={username}></InputUsername>
        <InputEmail register={register} errors={errors} value={email}></InputEmail>
        <InputPassword register={register} errors={errors} title={'New password'} requiredValue={false}></InputPassword>
        <InputUrl register={register} errors={errors} value={image}></InputUrl>
        <p></p>
        <Submit type={'primary'} text={'Save'}></Submit>
      </form>
      <Loader loading={loading}></Loader>
      <AlertError error={error}></AlertError>
    </div>
  );
};

export default EditeProfile;
