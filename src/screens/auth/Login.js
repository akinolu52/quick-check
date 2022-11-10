import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import logo from "../../assets/logo.png";
import { Button, FormInput, PasswordInput } from '../../components';
import { useAuth } from '../../providers';
import { loginSchema } from '../../schemas';
import { setCredentials } from '../../slice/auth';
import { APP_ROUTES, height, isEmpty } from '../../utils';
import { useAppDispatch } from "../../utils/store";

function LoginScreen({ navigation }) {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const { setUser, checkEmail, setProviderUser } = useAuth();
    const dispatch = useAppDispatch();

    const { control, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async data => {
        try {
            setIsLoading(true);

            const payload = { user: data }

            const check = await checkEmail(data.email);
         

            if (!check) {
                if (Platform.OS === 'web') {
                    alert('Email does not exist!')
                    return
                }
                Alert.alert('Email does not exist!');
                return;
            }

            const result = await setUser(data);

            if (!result) {
                if (Platform.OS === 'web') {
                    alert('Invalid credentials!')
                    return
                }
                Alert.alert('Invalid credentials!');
                return;
            }


            dispatch(setCredentials(payload))
            setProviderUser(data);
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

                {!isEmpty(user) ? (
                    <Text variant="titleMedium">
                        Welcome {user?.firstname}
                    </Text>
                ) : (
                    <Text variant="bodySmall">Login to continue</Text>
                )}

            </View>
            <View style={styles.form}>
                <View style={styles.inputContent}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormInput
                                placeholder="Email Address"
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
                            text="Sign In"
                            isLoading={isLoading}
                            onPress={handleSubmit(onSubmit)}
                        />

                        <Text variant='labelMedium' style={styles.btnText} onPress={() => navigation.navigate(APP_ROUTES.REGISTER)}>Create an Account?</Text>
                    </View>

                </View>
            </View>
        </View>
    );
}

export { LoginScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF',
        padding: 16,
    },
    topContent: {
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
