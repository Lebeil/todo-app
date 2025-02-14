// src/services/pocketbase.ts
import PocketBase from 'pocketbase';

//Pour une connexion wifi
// const pb = new PocketBase('http://192.168.1.20:8090');

//Pour une connexion mobile
const pb = new PocketBase('http://172.20.10.5:8090');

pb.autoCancellation(false); // Optionnel : à utiliser avec précaution (voir explications précédentes)

export default pb;