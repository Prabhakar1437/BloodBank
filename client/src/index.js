import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#B22222",
          colorBorder: "#B22222",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);

