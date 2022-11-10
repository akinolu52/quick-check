import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = () => {
    const getItem = async (key, isObject = true) => {
        try {
            const value = await AsyncStorage.getItem(`@${key}`);
            if (value !== null) {
                return isObject ? JSON.parse(value) : value;
            }
        } catch (e) {
            // error reading value
        }
    };

    const setItem = async (key, value, isObject = true) => {
        try {
            let val;
            if (isObject) {
                val = JSON.stringify(value)
            } else {
                val = value;
            }

            await AsyncStorage.setItem(`@${key}`, val);
            return value;
        } catch (e) {
            // saving error
        }
    }

    const removeItem = async (key) => {
        try {
            await AsyncStorage.removeItem(`@${key}`);
            return true;
        } catch (e) {
            // remove error
        }
    };

    return {
        getItem,
        setItem,
        removeItem,
    };
};

export default Storage;