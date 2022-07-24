import classes from 'components/Main/Main.module.scss';
import SignIn from 'components/SignIn/SignIn';
import SignUp from 'components/SignUp/SignUp';
import EditeProfile from 'components/EditeProfile/EditeProfile';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Articles from 'components/Articles/Articles';
import CreateArticle from 'components/CreateArticle/CreateArticle';
import Slug from 'components/Slug/Slug';

const Main = () => {
  const { username } = useSelector((state) => state.user.userProfile);

  return (
    <main className={classes.Main}>
      <Switch>
        <Route exact path="/sign-in">
          {username ? <Redirect to="/" /> : <SignIn />}
        </Route>
        <Route exact path="/sign-up">
          {username ? <Redirect to="/" /> : <SignUp />}
        </Route>
        <Route exact path="/edite-profile">
          {!username ? <Redirect to="/" /> : <EditeProfile />}
        </Route>
        <Route exact path="/new-article">
          {!username ? <Redirect to="/" /> : <CreateArticle />}
        </Route>
        <Route
          exact
          path="/articles/:slug"
          render={({ match }) => {
            return <Slug slugTitle={match.params.slug}></Slug>;
          }}
        ></Route>
        <Route
          exact
          path="/articles/:slug/edit"
          render={({ match }) => {
            return !username ? <Redirect to="/" /> : <CreateArticle slugTitle={match.params.slug}></CreateArticle>;
          }}
        ></Route>
        <Route exact path="/">
          <Articles></Articles>
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
