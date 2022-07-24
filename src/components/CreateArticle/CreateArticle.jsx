import classes from 'components/CreateArticle/CreateArticle.module.scss';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputArticle, InputTextarea, InputsTags } from 'components/Input/Input';
import { Loader, AlertError } from 'components/Alert/Alret';
import { Submit } from 'components/Buttons/Buttons';
import { useEffect } from 'react';
import { requestSlug, setSlug } from 'features/article/articleSlice';
import { element } from 'prop-types';

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
    name: 'tags',
    value: '',
  });
  useEffect(() => {
    remove();
    if (!!slugTitle) {
      dispatch(requestSlug(slugTitle));
    } else {
      dispatch(setSlug({}));
      append({ tags: 'tags' });
    }
    if (!!tagList) {
      append(
        tagList.filter(Boolean).map((element) => {
          return { name: 'tags', value: element };
        })
      );
    }
  }, [append, dispatch, slugTitle, title]);

  console.log('slugTitle ', slugTitle);
  console.log('fields ', fields);
  console.log('tagList ', tagList);

  const onSubmit = (data) => {
    data.tags = data.tags?.map((tag) => {
      return tag.value.trim();
    });
    data.tags = data.tags.filter(Boolean);
    reset();
  };

  return (
    <div className={classes.CreateArticle}>
      <div className={classes.CreateArticle__title}>{!!slugTitle ? 'Edite' : 'Create new'} article</div>
      <form className={classes.CreateArticle__form} onSubmit={handleSubmit(onSubmit)}>
        <InputArticle
          registerName={'title'}
          register={register}
          errors={errors}
          value={!!slugTitle && title}
        ></InputArticle>
        <InputArticle
          registerName={'shortDdescription'}
          register={register}
          title={'Short Description'}
          errors={errors}
          value={!!slugTitle && description}
        ></InputArticle>
        <InputTextarea
          register={register}
          errors={errors}
          registerName={'description'}
          value={!!slugTitle && body}
        ></InputTextarea>
        <InputsTags register={register} remove={remove} append={append} fields={fields}></InputsTags>

        <Submit type={'primary'} text={'Send'}></Submit>
      </form>
      <Loader loading={loading}></Loader>
      <AlertError error={error}></AlertError>
    </div>
  );
};

export default CreateArticle;
