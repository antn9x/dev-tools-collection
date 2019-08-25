import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import { ipcRenderer } from 'electron';

import i18n from './i18n';
import App from './App';
import './app.global.css';
import { CHANGE_LANGUAGE } from '../constant.message';

ipcRenderer.on(CHANGE_LANGUAGE, (sender, lang) => {
  i18n.changeLanguage(lang);
});

render( <I18nextProvider i18n={i18n}>
  <AppContainer >
    <App />
  </AppContainer>
</I18nextProvider>// eslint-disable-line
,document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App'); // eslint-disable-line global-require
    render( <I18nextProvider i18n={i18n}>
      <AppContainer >
        <NextApp />
      </AppContainer>
    </I18nextProvider>// eslint-disable-line
    , document.getElementById('root')
    );
  });
}
