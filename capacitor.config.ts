import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.placacheck.app',
  appName: 'PlacaCheck',
  webDir: 'public',
  server: {
    url: 'http://172.20.10.3:3000',
    cleartext: true
  }
};

export default config;
