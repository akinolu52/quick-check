import * as Linking from 'expo-linking';
import * as React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import emmanuel from "../assets/emmanuel.png";

function AboutScreen() {
    const openLink = (url) => {
        Linking.openURL(url);
    };
    return (
        <ImageBackground source={emmanuel} style={styles.imageBackground} resizeMode='cover'>


            <View style={styles.container}>
                <Image source={emmanuel} style={styles.image} resizeMode='cover' />
                <Text style={styles.name}>Emmanuel Akinyemi</Text>
                <Text style={styles.position}>Software Engineer</Text>

                <Text style={styles.summary}>
                    I am a frontend software Engineer with experience in web and mobile development.
                    I love using: React, React Native, JavaScript and Typescript
                </Text>

                <Text style={styles.connect}>Connect with Me</Text>

                <View style={styles.content}>
                    <MaterialCommunityIcons
                        name="gmail"
                        color='#f54d07'
                        size={30}
                        onPress={openLink.bind(null, 'mailto:akinolu52@gmail.com')}
                    />
                    <MaterialCommunityIcons
                        name="linkedin"
                        color='#f54d07'
                        size={30}
                        onPress={openLink.bind(null, 'https://www.linkedin.com/in/akinyemi-emmanuel-512101a1/')}
                    />
                    <MaterialCommunityIcons
                        name="pound-box-outline"
                        color='#f54d07'
                        size={30}
                        onPress={openLink.bind(null, 'https://hashnode.com/@akinolu52')}
                    />
                    <MaterialCommunityIcons
                        name="phone-dial-outline"
                        color='#f54d07'
                        size={30}
                        onPress={openLink.bind(null, 'tel:+2349055685712')}
                    />
                </View>
            </View>
        </ImageBackground>

    );
}

export { AboutScreen };

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 16,
    },
    container: {
        width: '100%',
        height: '30%',
        padding: 16,
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
    content: {
        borderWidth: 1,
        borderColor: 'red',
        height: '50%',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginBottom: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    position: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
        color: 'lightgray',
    },
    summary: {
        fontSize: 12,
        marginBottom: 15,
        textAlign: 'justify',
    },
    connect: {
        fontSize: 11,
        fontWeight: '600',
        marginBottom: 4,
    },
    content: {
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ecedf3',
    },

});