import { Link } from 'react-router-dom';
import classes from 'components/Header/Header.module.scss';
import Nav from 'components/Nav/Nav';
import { useDispatch } from 'react-redux';
import { setOffset } from 'features/article/articleSlice';

function Header() {
  const dispatch = useDispatch();

  return (
    <header className={classes.Header}>
      <div className={classes.Header__container}>
        <Link
          to={'/'}
          className={classes.Header__logo}
          onClick={() => {
            dispatch(setOffset(0));
          }}
        >
          Realworld Blog
        </Link>
        <Nav />
      </div>
    </header>
  );
}
export default Header;
