import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="signin"
                options={{
                    title: "Connexion"
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    title: "Inscription"
                }}
            />
        </Stack>
    );
}
