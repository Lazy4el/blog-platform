import classes from 'components/CreateArticle/CreateArticle.module.scss';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputArticle, InputTextarea, InputsTags } from 'components/Input/Input';
import { Loader, AlertError } from 'components/Alert/Alret';
import { Submit } from 'components/Buttons/Buttons';
import { useEffect } from 'react';
import { requestCreateSlug } from 'features/article/articleSlice';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.article);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({ mode: 'onBlur' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
    value: '',
  });

  useEffect(() => {
    append({ tagList: 'tags', value: '' });
  }, [append, dispatch]);

  const onSubmit = (data) => {
    data.tagList = data.tagList?.map((tag) => {
      return tag.value.trim();
    });
    data.tagList = data.tagList.filter(Boolean);
    dispatch(requestCreateSlug(data));
    reset();
  };

  return (
    <div className={classes.CreateArticle}>
      <div className={classes.CreateArticle__title}>Create new article</div>
      <form className={classes.CreateArticle__form} onSubmit={handleSubmit(onSubmit)}>
        <InputArticle registerName={'title'} register={register} errors={errors}></InputArticle>
        <InputArticle
          registerName={'description'}
          register={register}
          title={'Short Description'}
          errors={errors}
        ></InputArticle>
        <InputTextarea register={register} errors={errors} registerName={'body'}></InputTextarea>
        <InputsTags register={register} remove={remove} append={append} fields={fields}></InputsTags>

        <Submit type={'primary'} text={'Send'}></Submit>
      </form>
      <Loader loading={loading}></Loader>
      <AlertError error={error}></AlertError>
    </div>
  );
};

export default CreateArticle;
