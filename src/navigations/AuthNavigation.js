
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, RegisterScreen } from '../screens';
import { APP_ROUTES } from '../utils';

const Stack = createNativeStackNavigator();

function AuthNavigation() {
    return (
        <Stack.Navigator
            initialRouteName={APP_ROUTES.LOGIN}
            screenOptions={{
                headerShown: false
            }} >
            <Stack.Screen name={APP_ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={APP_ROUTES.REGISTER} component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export { AuthNavigation };
