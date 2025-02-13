// app/_layout.tsx
import React, { useState, useEffect } from 'react';
import { Slot } from 'expo-router';
import pb from '../src/services/pocketbase';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from 'react-native'; // Importe ActivityIndicator
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
    const [user, setUser] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await SecureStore.getItemAsync('userToken');
                const userId = await SecureStore.getItemAsync('userId');

                if (token && userId) {
                    pb.authStore.save(token, {
                        id: userId,
                        collectionId: 'users',
                        collectionName: 'users'
                    }); // Réhydrate le authStore
                    if (pb.authStore.isValid) {
                        await pb.collection('users').authRefresh(); // Rafraîchit le token
                    }
                    setUser(pb.authStore.isValid); // Utilise isValid au lieu de model
                }
            } catch (error) {
                console.error("Erreur de vérification d'auth:", error);
                // En cas d'erreur, on déconnecte l'utilisateur par sécurité
                await SecureStore.deleteItemAsync('userToken');
                await SecureStore.deleteItemAsync('userId');
            } finally {
                setIsLoading(false); // Indique que le chargement est terminé
            }
        };

        const unsubscribe = pb.authStore.onChange(() => {
            setUser(pb.authStore.isValid)
        });

        checkAuth(); // Vérifie l'authentification au montage du composant

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        // Affiche un indicateur de chargement pendant la vérification
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <Slot />
        </SafeAreaProvider>
    )
}