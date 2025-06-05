import { Stack } from 'expo-router/stack';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';

export default function Layout() {
    return (
        <View style={styles.container}>
            <Stack screenOptions={{ headerShown: false }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3DBAC2",
        paddingTop: Constants.statusBarHeight + 8
    }
})
