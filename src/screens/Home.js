import * as Linking from 'expo-linking';
import * as React from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from "../assets/logo.png";
import { useAuth } from '../providers';
import { useGetStoriesQuery, useGetTopStoriesQuery } from '../services';

const openLink = id => Linking.openURL(`https://news.ycombinator.com/item?id=${id}`);

const getTime = time => new Date(time * 1000).toLocaleDateString('en-US')

const Item = ({ title, by, score, id, time, kids }) => (
    <Pressable onPress={openLink.bind(null, id)}>
        <Card.Title
            title={title}
            titleStyle={styles.topItemTitleStyle}
            subtitleStyle={styles.topItemSubtitleStyle}
            subtitle={
                <>
                    {`${score} points by ${by}`},
                    <MaterialCommunityIcons name="alarm" color='#f54d07' />
                    {getTime(time)}
                    <MaterialCommunityIcons name="comment-text-outline" color='#f54d07' />
                    {kids?.length || 0}
                </>
            }
            leftStyle={styles.topItemLeftStyle}
            style={styles.itemContainer}
            left={(props) => <Avatar.Icon {...props} icon="lightbulb-outline" style={styles.topItemAvatarStyle} />}
        />
    </Pressable>
);

const TopItem = ({ title, by, score, id, time }) => (
    <Pressable onPress={openLink.bind(null, id)}>
        <Card.Title
            title={title}
            titleStyle={styles.topItemTitleStyle}
            subtitleStyle={styles.topItemSubtitleStyle}
            subtitle={`${score} points by ${by}`}
            leftStyle={styles.topItemLeftStyle}
            rightStyle={styles.topItemRightStyle}
            style={styles.topItemContainer}
            left={(props) => <Avatar.Icon {...props} icon="lightning-bolt" style={styles.topItemAvatarStyle} />}
        />
    </Pressable>
);

function HomeScreen() {
    const [page, setPage] = React.useState(1);
    const { removeUser } = useAuth();

    const { isLoading: topStoriesIsLoading, data: topStoriesData, refetch: storiesTopRefetch, isError: topStoriesError } = useGetTopStoriesQuery(page);
    const { isLoading: storiesIsLoading, data: storiesData, isError: storiesError } = useGetStoriesQuery();

    const renderTopItem = ({ item }) => (
        <TopItem {...item} />
    );

    const renderItem = ({ item }) => (
        <Item {...item} />
    );

    const logout = async () => await removeUser();

    const onTopStoriesRefresh = () => {
        setPage(x => x + 1);
        storiesTopRefetch();
    }

    const onEndReached = () => {
        setPage(x => x + 1);
        storiesTopRefetch();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />

                <MaterialCommunityIcons name="power" color='#f54d07' size={25} onPress={logout} />
            </View>

            {topStoriesIsLoading || storiesIsLoading ? (
                <Text>Loading...</Text>
            ) : null}

            {!storiesError && storiesData?.length > 0 && (
                <View style={styles.topContent}>
                    <Text variant="bodyLarge" style={styles.title}>Featured Stories</Text>

                    <FlatList
                        horizontal
                        snapToAlignment="center"
                        decelerationRate="fast"
                        disableIntervalMomentum
                        refreshing={storiesIsLoading}
                        data={storiesData}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderTopItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            )}

            {!topStoriesError && topStoriesData?.length > 0 && (
                <>
                    <Text variant="bodyLarge" style={styles.title}>Top Stories</Text>

                    <FlatList
                        onEndReached={onEndReached}
                        onEndReachedThreshold={.7}
                        refreshing={topStoriesIsLoading}
                        onRefresh={onTopStoriesRefresh}
                        data={topStoriesData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </>
            )}
        </SafeAreaView>
    );
}

export { HomeScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ecedf3',
        paddingHorizontal: 16,
        paddingBottom: -34,
        paddingTop: 16,
    },
    topContent: {
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    logo: {
        marginBottom: 15,
        width: 150,
        height: 25,
    },

    topItemAvatarStyle: {
        width: 30,
        height: 30,
    },
    topItemTitleStyle: {
        fontSize: 12,
        lineHeight: 24,
        fontWeight: '600',
    },
    topItemSubtitleStyle: {
        fontSize: 9,
        lineHeight: 18,
    },
    topItemLeftStyle: {
        width: 30,
        height: 30
    },
    topItemContainer: {
        overflow: 'hidden',
        paddingRight: 1,
        minHeight: 70,
        minWidth: 250,
        marginRight: 20,
        borderRadius: 5,
        backgroundColor: 'lightgray',
    },
    topItemRightStyle: {
        height: '100%',
        borderRightWidth: 2,
        borderRightColor: '#f54d07',
    },
    itemContainer: {
        overflow: 'hidden',
        paddingRight: 1,
        minHeight: 70,
        minWidth: '100%',
        marginRight: 20,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#f54d07',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    title: {
        fontWeight: 'bold',
        marginBottom: 10
    },
});