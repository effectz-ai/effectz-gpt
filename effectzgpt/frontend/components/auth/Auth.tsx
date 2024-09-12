'use client';

import React, { useState } from 'react';
import { auth, db } from '@/config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {useRouter} from "next/navigation";

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await createUserDocument(userCredential.user);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push('/dashboard');
        } catch (error) {
            setError('Invalid Credentials');
        }
    };

    const handleGoogleAuth = async () => {
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            await createUserDocument(userCredential.user);
            router.push('/dashboard');
        } catch (error) {
            setError('Invalid Credentials');
        }
    };

    const createUserDocument = async (user: any) => {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                email: user.email,
                role: 'user',
                createdAt: new Date().toISOString()
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
            <form onSubmit={handleEmailAuth}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full m-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full m-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="w-full m-1 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
                >{isSignUp ? 'Sign Up' : 'Log In'}</button>
            </form>
            <div className="mt-4 flex flex-col items-center">
                <button
                    onClick={handleGoogleAuth}
                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300 mb-4"
                >Sign in with Google</button>
                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-indigo-500 hover:underline"
                >
                    {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
                </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}