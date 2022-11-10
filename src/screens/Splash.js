import * as React from 'react';
import { Image, View } from 'react-native';
import logo from "../assets/logo.png";

function SplashScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={logo} />
        </View>
    );
}

export { SplashScreen };
