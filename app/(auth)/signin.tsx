// app/(auth)/signin.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import pb from '../../src/services/pocketbase';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            // Stockage SÉCURISÉ du token et de l'ID utilisateur
            await SecureStore.setItemAsync('userToken', authData.token);
            await SecureStore.setItemAsync('userId', authData.record.id);
            router.replace('/(tabs)');
        } catch (error: any) {
            console.error("Erreur d'authentification:", error);
            Alert.alert("Erreur d'authentification", error.message); // Affiche l'erreur à l'utilisateur
        } finally {
            setLoading(false); // Arrête l'indicateur de chargement
        }
    };

    return (
        <View style={styles.container}>
            <Text h2 style={styles.title}>Connexion</Text>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            />
            <Input
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
            />
            <Button title="Se connecter" onPress={handleLogin} loading={loading} disabled={!email || !password} />
            <Text style={{ marginTop: 20, textAlign: 'center' }}> Vous n'avez pas de compte ?</Text>
            <Button title="S'inscrire" onPress={() => router.push('/(auth)/signup')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
});
export default SignInScreen;