import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import 'antd/dist/antd.css';
import './index.css';

import { ConnectedApp } from './routes/app';
import { ConnectedLogin } from './routes/login';
import { ConnectedHome } from './routes/home';
import { ConnectedTodo } from './routes/todo';

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnectedApp />}>
            <Route path="home" element={<ConnectedHome />} />
            <Route path="todo" element={<ConnectedTodo />} />
          </Route>
          <Route path="login" element={<ConnectedLogin />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  rootElement
);
