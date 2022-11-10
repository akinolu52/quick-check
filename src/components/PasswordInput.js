import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, HelperText, TextInput } from 'react-native-paper';

const PasswordInput = ({ onChangeText, error, label, placeholder, value }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <View style={styles.container}>
            <TextInput
                label={label || placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={showPassword ? false : true}
                right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(x => !x)} />}
                autoCapitalize="none"
            />

            {error ? (
                <View style={styles.error}>
                    <Avatar.Icon size={16} icon="exclamation" />
                    <HelperText style={styles.errorText} type="error" visible={true}>{error}</HelperText>
                </View>
            ) : null}
        </View>

    );
};

export { PasswordInput };

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    error: {
        marginTop: 4,
        alignItems: 'center',
        flexDirection: 'row',
    },
    errorText: {
        marginLeft: -2,
    },
});
