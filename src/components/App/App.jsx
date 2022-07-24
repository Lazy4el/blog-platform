import React, { useEffect } from 'react';
import Header from 'components/Header/Header';
import Main from 'components/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header></Header>
      {!loading && <Main></Main>}
    </React.Fragment>
  );
}

export default App;
