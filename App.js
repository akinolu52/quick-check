import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from "react-redux";
import { AppNavigation } from "./src/navigations";
import { AuthProvider } from './src/providers';
import { store } from "./src/utils/store";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f54d07',
  },
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>

        <AuthProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar setBarStyle="dark-content" />

              <AppNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthProvider>

      </PaperProvider>
    </ReduxProvider>
  );
}
