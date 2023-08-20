import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.codingegret.weatherapp',
  appName: 'weather-app',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
