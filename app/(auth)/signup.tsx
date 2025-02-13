// app/(auth)/signup.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import pb from '../../src/services/pocketbase';
import { useRouter } from 'expo-router';

function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        setLoading(true);
        if (password !== passwordConfirm) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
            setLoading(false);
            return; // Arrête l'exécution de la fonction
        }

        try {
            const data = {
                email,
                emailVisibility: false, // Cache l'email par défaut
                password,
                passwordConfirm,
                name: 'Nom Exemple', // Remplace par un champ de nom si tu en as un
            };
            const record = await pb.collection('users').create(data);
            Alert.alert("Compte créé", "Vous pouvez maintenant vous connecter.");
            router.replace('/(auth)/signin'); // Redirige vers l'écran de connexion
        } catch (error: any) {
            console.error("Erreur lors de la création du compte:", error);
            Alert.alert("Erreur de création", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text h2 style={styles.title}>Inscription</Text>
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
            <Input
                placeholder="Confirmation du mot de passe"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
            />
            <Button title="S'inscrire" onPress={handleSignup} loading={loading} disabled={!email || !password || !passwordConfirm} />
            <Text style={{ marginTop: 20, textAlign: 'center' }}> Vous avez déjà un compte ?</Text>
            <Button title="Se connecter" onPress={() => router.push('/(auth)/signin')} />
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

export default SignUpScreen;