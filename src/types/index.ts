// src/types/index.ts
import Record from 'pocketbase';

export interface User extends Record {
    id: string;
    email: string;
    name?: string; // Optionnel, si tu as ajouté ce champ
    avatar?: string; // Optionnel, si tu as ajouté ce champ
}

export interface Task extends Record {
    title: string;
    description?: string;
    dueDate?: string; // Date au format ISO 8601
    completed: boolean;
    list: string;
    user: string;
}

export interface List extends Record {
    name: string;
    user: string;
}