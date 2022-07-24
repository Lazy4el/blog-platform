import classes from 'components/Input/Input.module.scss';
import { Button } from 'antd';

// Почта
export const InputEmail = ({ register, errors, title, value, valid = true }) => {
  let role = {
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'email должен быть корректным почтовым адресом',
    },
  };
  if (!valid) {
    role = {};
  }
  return (
    <label>
      <p className={classes.Input__title}>{title ? title : 'Email address'}</p>
      <input
        {...register('email', {
          required: 'Поле должно быть заполнено',
          ...role,
        })}
        className={`${classes.Input__input} ${errors?.email && classes.Input__error}`}
        type="text"
        placeholder="Email address"
        defaultValue={value}
      />
      <p className={classes.Input__error_text}>{errors?.email && errors?.email?.message}</p>
    </label>
  );
};

// Пароль
export const InputPassword = ({ register, errors, title, valid = true, requiredValue = true }) => {
  let roleLenght = {
    minLength: {
      value: 6,
      message: 'password должен быть от 6 символов (включительно)',
    },
    maxLength: {
      value: 40,
      message: 'password должен быть до 40 символов (включительно)',
    },
  };
  let roleRequired = { required: 'Поле должно быть заполнено' };
  if (!valid) {
    roleLenght = {};
  }
  if (!requiredValue) {
    roleRequired = { required: false };
  }
  return (
    <label>
      <p className={classes.Input__title}>{title ? title : 'Password'}</p>
      <input
        {...register('password', {
          ...roleRequired,
          ...roleLenght,
        })}
        className={`${classes.Input__input} ${errors?.password && classes.Input__error}`}
        type="password"
        placeholder="Password"
      />
      <p className={classes.Input__error_text}>{errors?.password && errors?.password?.message}</p>
    </label>
  );
};

// Имя пользователя
export const InputUsername = ({ register, errors, title, value }) => {
  return (
    <label>
      <p className={classes.Input__title}>{title ? title : 'Username'}</p>
      <input
        {...register('username', {
          required: 'Поле должно быть заполнено',
          minLength: {
            value: 3,
            message: 'username должен быть от 3 символов (включительно)',
          },
          maxLength: {
            value: 20,
            message: 'username должен быть до 20 символов (включительно)',
          },
        })}
        className={`${classes.Input__input} ${errors?.username && classes.Input__error}`}
        type="text"
        placeholder="Username"
        defaultValue={value}
      />
      <p className={classes.Input__error_text}> {errors?.username && errors?.username?.message}</p>
    </label>
  );
};

// Повторить пароль
export const InputReapeatPassword = ({ register, errors, watch }) => {
  return (
    <label>
      <p className={classes.Input__title}>Repeat Password</p>
      <input
        {...register('repeatPassword', {
          required: 'Поле должно быть заполнено',
          validate: (val) => {
            if (watch('password') !== val) {
              return 'password и repeat password должны совпадать';
            }
          },
        })}
        className={`${classes.Input__input} ${errors?.repeatPassword && classes.Input__error}`}
        type="password"
        placeholder="Repeat Password"
      />
      <p className={classes.Input__error_text}>{errors?.repeatPassword && errors?.repeatPassword.message}</p>
    </label>
  );
};

// Соглашение пользователя
export const InputAgreement = ({ register, errors }) => {
  return (
    <div>
      <label className={classes.Input__agreement}>
        <input
          {...register('agreement', {
            required: 'Галочка согласия с обработкой персональных данных должна быть отмечена',
          })}
          type="checkbox"
          className={classes.Input__checkbox}
          placeholder="Repeat Password"
        />
        <p className={classes.Input__text}>I agree to the processing of my personal information</p>
      </label>
      <p className={classes.Input__error_text}>{errors?.agreement && errors?.agreement?.message}</p>
    </div>
  );
};

// Url
export const InputUrl = ({ register, errors, title }) => {
  return (
    <label>
      <p className={classes.Input__title}>{title ? title : 'Avatar image (url)'}</p>
      <input
        {...register('image', {
          pattern: {
            value: /^https?:\/\/.*\.(?:jpe?g|gif|png)$/gi,
            message: 'Avatar image должен быть корректным url',
          },
        })}
        className={`${classes.Input__input} ${errors?.image && classes.Input__error}`}
        type="text"
        placeholder="Avatar image"
      />
      <p className={classes.Input__error_text}> {errors?.image && errors?.image?.message}</p>
    </label>
  );
};

export const InputArticle = ({ register, errors, title, registerName, value }) => {
  return (
    <label>
      <p className={classes.Input__title}>{title ? title : 'Title'}</p>
      <input
        {...register(registerName, {
          required: 'Поле должно быть заполнено',
        })}
        type="text"
        placeholder="Title"
        defaultValue={!!value ? value : null}
        className={`${classes.Input__input} ${errors?.image && classes.Input__error}`}
      />
      <p className={classes.Input__error_text}> {errors[registerName] && errors[registerName]?.message}</p>
    </label>
  );
};

// Поле для больших текстов
export const InputTextarea = ({ title, errors, registerName, register, value }) => {
  return (
    <label className={`${classes.Input__label}`}>
      <p className={classes.Input__title}>{title ? title : 'Text'}</p>
      <textarea
        className={`${classes.Input__input} ${classes.Input__textarea}`}
        rows={4}
        defaultValue={!!value ? value : null}
        placeholder={'Text'}
        {...register(registerName, {
          required: 'Поле должно быть заполнено',
        })}
      ></textarea>
      <p className={classes.Input__error_text}> {errors[registerName] && errors[registerName]?.message}</p>
    </label>
  );
};

// Поле тегов
export const InputsTags = ({ fields, register, remove, append }) => {
  return (
    <div className={classes.Input__wrap}>
      <p className={classes.Input__title}>{'Tags'}</p>
      {fields.length !== 0 ? (
        fields.map(({ value, id }, index) => (
          <div key={id} className={classes.Input__tagWrap}>
            <label>
              <input
                {...register(`tags.${index}.value`)}
                type="text"
                defaultValue={value}
                placeholder="Title"
                className={`${classes.Input__input} ${classes.Input__tag}`}
              />
            </label>
            <Button
              danger
              onClick={() => {
                remove(index);
              }}
            >
              Delete
            </Button>

            {fields.length === index + 1 && (
              <Button
                type="primary"
                ghost
                className={classes.Input__addTag}
                onClick={() => {
                  append({ tags: 'tags', value: '' });
                }}
              >
                Add tag
              </Button>
            )}
          </div>
        ))
      ) : (
        <Button
          type="primary"
          ghost
          className={classes.Input__addTag}
          onClick={() => {
            append({ tags: 'tags', value: '' });
          }}
        >
          Add tag
        </Button>
      )}
    </div>
  );
};
