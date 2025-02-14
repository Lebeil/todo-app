import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, ListItem, CheckBox } from '@rneui/themed';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

export default function TasksScreen() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Faire les courses', completed: false },
        { id: '2', title: 'Appeler le médecin', completed: true },
        { id: '3', title: 'Réviser pour l\'examen', completed: false },
    ]);

    const toggleTask = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const renderTask = ({ item }: { item: Task }) => (
        <ListItem bottomDivider>
            <CheckBox
                checked={item.completed}
                onPress={() => toggleTask(item.id)}
            />
            <ListItem.Content>
                <ListItem.Title style={item.completed ? styles.completedTask : null}>
                    {item.title}
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <Button
                title="+ Nouvelle tâche"
                containerStyle={styles.buttonContainer}
                onPress={() => {/* TODO: Implémenter l'ajout de tâche */ }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    list: {
        flex: 1,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    buttonContainer: {
        padding: 10,
    },
}); 