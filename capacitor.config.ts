import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.placacheck.app',
  appName: 'PlacaCheck',
  webDir: 'public',
  server: {
    url: 'https://placa-check.vercel.app',
    cleartext: true
  }
};

export default config;
