import "./global.css";
import React, { Fragment } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';

import ConfigApp from "./src/main/ConfigApp";
import { ContextProvider } from "./src/utils/provider/ContextProvider";

const App = () => {
  
  return (
    <Fragment>
      <SafeAreaProvider>
        <ContextProvider>
          <NavigationContainer>
            <ConfigApp />
          </NavigationContainer>
        </ContextProvider>
      </SafeAreaProvider>
    </Fragment>
  );
};

export default App;
