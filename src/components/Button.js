import * as React from 'react';
import { Button as Btn } from 'react-native-paper';

const Button = ({ title, text, onPress, isLoading }) => (
    <Btn
        mode="contained"
        onPress={onPress}
        disabled={isLoading}
        loading={isLoading}
    >
        {title || text}
    </Btn>
);

export { Button };
