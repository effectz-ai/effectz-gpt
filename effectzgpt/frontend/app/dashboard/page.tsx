'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
    const { user, role, signOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/login');
    };

    if (!user) {
        return null; // or a loading indicator
    }

    return (
        <ProtectedRoute>
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
                <p className="text-lg text-gray-700 mb-2 text-center">Welcome, <span
                    className="font-semibold">{user.email}</span>!</p>
                <p className="text-lg text-gray-700 mb-6 text-center">Your role is: {role}</p>
                <div className="flex justify-center space-x-4">

                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                >Logout</button>
                <button
                    onClick={() => router.push('/')}
                    className="bg-green-950 ml-1 hover:text-black text-white px-4 py-2 rounded-md hover:bg-green-100 transition-colors duration-300"
                >Chat</button>
                {role === 'admin' && (
                    <button
                        onClick={() => router.push('/admin')}
                        className="bg-indigo-500 text-white ml-1 px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
                    >Go to Admin Page</button>
                )}
            </div>
        </ProtectedRoute>
    );
}