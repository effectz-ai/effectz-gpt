'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from "@/config/firebase";
import {doc, getDoc, setDoc} from 'firebase/firestore';
import { signOut as firebaseSignOut } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    role: string | null;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, role: null , signOut: async () => {},});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setRole(userDoc.data()?.role || 'user');
                } else {
                    // Only set role if the document doesn't exist
                    await setDoc(userDocRef, {
                        email: user.email,
                        role: 'user',
                        createdAt: new Date().toISOString()
                    });
                    setRole('user');
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            await auth.signOut();
            setUser(null);
            setRole(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, role, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);