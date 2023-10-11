/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/screen/TabNavigator';
import Toast from 'react-native-toast-message';

// import store, {persistor} from './src/store/storeConfig';
// import {Provider as StoreProvider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    // <StoreProvider store={store}>
    //   <PersistGate persistor={persistor}>

    <NavigationContainer>
      <RootNavigator />
      <Toast />
    </NavigationContainer>

    //   </PersistGate>
    // </StoreProvider>
  );
};

export default App;
