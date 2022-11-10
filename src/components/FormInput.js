import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, HelperText, TextInput } from 'react-native-paper';

const FormInput = ({ onChangeText, label, error, placeholder, value }) => {

    return (
        <View style={styles.container}>
            <TextInput
                label={label || placeholder}
                value={value}
                onChangeText={onChangeText}
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

export { FormInput };


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
