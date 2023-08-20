import React from 'react';
import { getDevice }  from 'framework7/lite-bundle';
import {
  f7,
  f7ready,
  App,
  View,
} from 'framework7-react';
import capacitorApp from '../js/capacitor-app';
import routes from '../js/routes';
import { Provider } from 'react-redux';
import store from '../store'

const MyApp = () => {
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: 'Weather App', // App name
      theme: 'auto', // Automatic theme detection
      routes: routes,
      input: {
        scrollIntoViewOnFocus: device.capacitor,
        scrollIntoViewCentered: device.capacitor,
      },
      // Capacitor Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
  };
  f7ready(() => {

    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });

  return (
    <Provider store={store}>
    <App { ...f7params }>
        <View main className="safe-areas" url="/" />
    </App>
    </Provider>
  )
}
export default MyApp;