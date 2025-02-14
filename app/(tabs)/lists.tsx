// app/(tabs)/lists.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListsScreen() {
    return (
        <View style={styles.container}>
            <Text>Écran des Listes</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});