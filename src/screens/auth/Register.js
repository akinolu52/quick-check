import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, StyleSheet, View, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import logo from "../../assets/logo.png";
import { Button, FormInput, PasswordInput } from '../../components';
import { useAuth } from '../../providers';
import { registerSchema } from '../../schemas';
import { APP_ROUTES, height } from '../../utils';

function RegisterScreen({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { setUsers } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = async data => {
        try {
            setIsLoading(true);

            const result = await setUsers(data);
            if (!result) {
                if (Platform.OS === 'web') {
                    alert('Email already exist!')
                    return
                }
                Alert.alert('Email already exist!');
                return;
            }


            if (Platform.OS === 'web') {
                alert('Account created successfully!')
            } else {
                Alert.alert('Account created successfully!');

            }
            navigation.navigate(APP_ROUTES.LOGIN);
        } catch (error) {
            console.log('error component -> ', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContent}>
                <Image source={logo} style={styles.logo} />

                <Text variant="bodySmall">Create your account</Text>

            </View>
            <View style={styles.form}>
                <View style={styles.inputContent}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormInput
                                placeholder="Name"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                error={errors?.name?.message}
                            />
                        )}
                        name="name"
                        defaultValue=""
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormInput
                                placeholder="Email"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                error={errors?.email?.message}
                            />
                        )}
                        name="email"
                        defaultValue=""
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <PasswordInput
                                placeholder="Password"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                error={errors?.password?.message}
                            />
                        )}
                        name="password"
                        defaultValue=""
                    />

                    <View style={styles.btn}>
                        <Button
                            text="Sign Up"
                            isLoading={isLoading}
                            onPress={handleSubmit(onSubmit)}
                        />

                        <Text
                            variant='labelMedium'
                            style={styles.btnText}
                            onPress={() => navigation.navigate(APP_ROUTES.LOGIN)}>I have an Account?</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export { RegisterScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF',
        padding: 16,
    },
    topContent: {
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 15,
        justifyContent: 'space-between',
    },
    logo: {
        marginBottom: 10,
    },
    form: {
        marginBottom: height * 0.039,
        flex: 1,
    },
    inputContent: {
        marginTop: height * 0.021,
        marginBottom: height * 0.025,
    },
    btn: {
        marginTop: 20,
    },
    btnText: {
        marginTop: 15,
        textAlign: 'center'
    }
});
