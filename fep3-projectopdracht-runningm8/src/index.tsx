import React from 'react';
import ReactDOM from 'react-dom';


//routers
import {BrowserRouter} from "react-router-dom";
import {Navigator} from "./navigation/Navigator";
//store
import {initializeStore} from "./store";
import {Provider} from "react-redux";
import i18next from "i18next";
import "./i18n";
import {I18nextProvider} from "react-i18next";

const {store} = initializeStore()


ReactDOM.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18next}>
          <Provider store={store}>
              <BrowserRouter basename={process.env.PUBLIC_URL}>
                  <Navigator />
              </BrowserRouter>
          </Provider>
      </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
// <BrowserRouter basename={process.env.PUBLIC_URL}>

