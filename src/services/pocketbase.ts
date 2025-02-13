// src/services/pocketbase.ts
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // URL de ton instance PocketBase

pb.autoCancellation(false); // Optionnel : à utiliser avec précaution (voir explications précédentes)

export default pb;