import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'weather.app',
  appName: 'weather-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
