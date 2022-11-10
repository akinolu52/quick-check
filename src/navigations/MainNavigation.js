
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AboutScreen, HomeScreen } from '../screens';
import { APP_ROUTES } from '../utils';

const Tab = createBottomTabNavigator();

function MainNavigation() {
    return (
        <Tab.Navigator
            initialRouteName={APP_ROUTES.HOME}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#f54d07',
            }}
        >
            <Tab.Screen
                name={APP_ROUTES.HOME}
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={APP_ROUTES.ABOUT}
                component={AboutScreen}
                options={{
                    tabBarLabel: 'About',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="information" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export { MainNavigation };


