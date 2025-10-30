import "./global.css";
import React, { Fragment } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';

import ConfigApp from "./src/main/ConfigApp";

const App = () => {
  return (
    <Fragment>
      <SafeAreaProvider>

        <NavigationContainer>
          <ConfigApp />
        </NavigationContainer>
      </SafeAreaProvider>
    </Fragment>
  );
};

export default App;
