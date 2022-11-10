import { Dimensions } from 'react-native';

export * from './appRoutes';
export * from './routes';

export const BASE_URL = 'https://hacker-news.firebaseio.com/v0/'
export const { height, width } = Dimensions.get('window');

export const isEmpty = obj => {
    if (obj) {
        return !Object.entries(obj).length;
    }
    return true;
};
