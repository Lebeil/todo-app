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
            return;
        }

        // Validation supplémentaire
        if (!email.includes('@')) {
            Alert.alert("Erreur", "Email invalide");
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            Alert.alert("Erreur", "Le mot de passe doit faire au moins 8 caractères");
            setLoading(false);
            return;
        }

        try {
            const data = {
                email,
                password,
                passwordConfirm,
                username: email.split('@')[0],
            };

            // Log plus détaillé
            console.log("URL de l'API:", pb.baseUrl);
            console.log("Données envoyées:", JSON.stringify(data, null, 2));

            // Création du compte
            await pb.collection('users').create(data);

            // Connexion après création
            await pb.collection('users').authWithPassword(email, password);

            Alert.alert("Compte créé", "Vous êtes maintenant connecté !");
            router.replace('/');
        } catch (error: any) {
            console.error("Erreur complète:", error);
            console.error("Erreur détaillée:", {
                message: error.message,
                data: error.data,
                status: error.status,
                response: error.response,
                originalError: error
            });

            let errorMessage = "Erreur lors de la création du compte:\n";
            if (error.data?.data) {
                Object.entries(error.data.data).forEach(([key, value]) => {
                    errorMessage += `\n${key}: ${value}`;
                });
            } else {
                errorMessage += error.message;
            }

            Alert.alert("Erreur de création", errorMessage);
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