import classes from 'components/CreateArticle/CreateArticle.module.scss';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputArticle, InputTextarea, InputsTags } from 'components/Input/Input';
import { Loader, AlertError } from 'components/Alert/Alret';
import { Submit } from 'components/Buttons/Buttons';
import { useEffect } from 'react';
import { requestSlug, requestUpdateSlug } from 'features/article/articleSlice';

const CreateArticle = ({ slugTitle }) => {
  const dispatch = useDispatch();
  const { loading, error, slug } = useSelector((state) => state.article);
  const { title, body, description, tagList } = slug;

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
    dispatch(requestSlug(slugTitle));
    if (!!tagList) {
      append(
        tagList.filter(Boolean).map((element) => {
          return { name: 'tagList', value: element };
        })
      );
    }
  }, [append, dispatch, slugTitle, title]);

  const onSubmit = (data) => {
    data.tagList = data.tagList?.map((tag) => {
      return tag.value.trim();
    });
    data.tagList = data.tagList.filter(Boolean);
    dispatch(requestUpdateSlug({ data, slugTitle }));
    reset();
  };

  return (
    <div className={classes.CreateArticle}>
      <div className={classes.CreateArticle__title}>Edite article</div>
      {!loading && title ? (
        <form className={classes.CreateArticle__form} onSubmit={handleSubmit(onSubmit)}>
          <InputArticle registerName={'title'} register={register} errors={errors} valueDef={title}></InputArticle>
          <InputArticle
            registerName={'description'}
            register={register}
            title={'Short Description'}
            errors={errors}
            valueDef={description}
          ></InputArticle>
          <InputTextarea register={register} errors={errors} registerName={'body'} valueDef={body}></InputTextarea>
          <InputsTags register={register} remove={remove} append={append} fields={fields}></InputsTags>

          <Submit type={'primary'} text={'Send'}></Submit>
        </form>
      ) : null}
      <Loader loading={loading}></Loader>
      <AlertError error={error}></AlertError>
    </div>
  );
};

export default CreateArticle;
