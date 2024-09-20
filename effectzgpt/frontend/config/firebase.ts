import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import '@/envConfig';
import env from "@/envConfig";

const firebaseConfig = {
    apiKey: env.firebase.firebaseApiKey!,
    authDomain: env.firebase.firebaseAuthDomain!,
    projectId: env.firebase.firebaseProjectId!,
    storageBucket: env.firebase.firebaseStorageBucket!,
    messagingSenderId: env.firebase.firebaseMessagingSenderId!,
    appId: env.firebase.firebaseAppId!,
    measurementId: env.firebase.firebaseMesurementId!,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };