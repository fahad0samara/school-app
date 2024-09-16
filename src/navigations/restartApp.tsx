import { NativeModules } from 'react-native';

const { RNRestart } = NativeModules;

const restartApp = () => {
  if (RNRestart) {
    RNRestart.Restart();
  } else {
    console.warn('RNRestart module is not available.');
  }
};

export default restartApp;
