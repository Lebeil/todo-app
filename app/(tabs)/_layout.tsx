import React from 'react';
import { Tabs } from 'expo-router';
import { Button } from '@rneui/themed';
import pb from '../../src/services/pocketbase';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            pb.authStore.clear();
            await SecureStore.deleteItemAsync('userToken');
            await SecureStore.deleteItemAsync('userId');
            router.replace('/(auth)/signin');
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            Alert.alert("Erreur", "Problème lors de la déconnexion.");
        }
    };

    const LogoutButton = () => (
        <Button
            title="Déco"
            type="clear"
            onPress={handleLogout}
            titleStyle={{ marginRight: 10 }}
        />
    );

    return (
        <Tabs screenOptions={{
            headerRight: () => <LogoutButton />,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray'
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Tâches',
                    headerTitle: 'Tâches',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkmark-circle-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="lists"
                options={{
                    title: 'Listes',
                    headerTitle: 'Listes',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
} 