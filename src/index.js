import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import {Provider} from "react-redux";
// import store from "./redux/store"
import 'bootstrap/dist/css/bootstrap.css';
import setAuthorizationtoken from "../src/services/utils/setAuthorizationtoken";
import store from  "../src/redux/store";
import {Provider} from "react-redux";
import "./i18n";
import * as enTranslations from "../src/locales/en";
import * as hiTranslations from "../src/locales/hi";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";
import Backend from "i18next-http-backend";



const resources = {
  en: { messages: enTranslations},
  hi: { messages: hiTranslations},
  
};
const i18n = i18next.use(Backend).use(LanguageDetector).use(initReactI18next);
i18n.init({
  react: {
    wait: true,
  },
  resources: resources,
  lng: localStorage.getItem("i18nextLng"),
  fallbackLng: localStorage.getItem("i18nextLng"),
  keySeparator: ".",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  ns: ["messages"],
  defaultNS: "messages",
  fallbackNS: [],
});


setAuthorizationtoken(localStorage.jwtToken);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
