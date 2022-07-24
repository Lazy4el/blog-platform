import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import 'index.scss';
import store from 'store/store';
import App from 'components/App/App';
import { BrowserRouter as Route } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Route>
      <App />
    </Route>
  </Provider>
);
