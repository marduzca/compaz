import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './app/i18n/instance';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { UpdateAvailabilityEvent } from './app/components/domain';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('test')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (serviceWorkerRegistration: ServiceWorkerRegistration) => {
    window.dispatchEvent(
      new CustomEvent('updateAvailability', {
        detail: {
          serviceWorkerRegistration,
        } as UpdateAvailabilityEvent,
      })
    );
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
