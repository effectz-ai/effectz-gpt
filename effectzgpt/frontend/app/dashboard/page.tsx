'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import UserProfile from "@/components/auth/UserProfile";
import Image from "next/image";

export default function DashboardPage() {
    const { user, role, signOut, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/login');
    };
    if(loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <div>Not Authenticated <Link href={'/login'}>Login</Link></div>;
    }

    return (
        <ProtectedRoute>
            <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-md bg-gradient-to-r from-green-50 to-white">
                <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
                <div className="flex items-center justify-center mb-6">
                    <Image
                        src={user.photoURL||"https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1726206592~exp=1726210192~hmac=7167f3630828ad80630ef57f603c90721463c2648af8405393fc8bc7a8d74162&w=1060" }
                        alt="Profile Picture"
                        className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
                        width={100}
                        height={100}
                    />
                    <div>
                        <p className="text-lg text-gray-700">
                            Welcome, <span className="font-semibold">{user.displayName}</span>!
                        </p>
                        <p className="text-lg text-gray-700">Your role is: {role}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <UserProfile user={user}/>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="w-full my-1 border border-green-500 text-green-500 py-3 rounded-lg hover:bg-green-100 transition-colors duration-300"
                >Chat
                </button>
                {role === 'admin' && (
                    <button
                        onClick={() => router.push('/admin')}
                        className="w-full my-1 border border-green-900 text-green-900 py-3 rounded-lg hover:bg-green-100 transition-colors duration-300"                    >Go to Admin Page</button>
                )}
                <button
                    onClick={handleLogout}
                    className="w-full my-1 border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-100 transition-colors duration-300"                >Logout
                </button>
            </div>
        </ProtectedRoute>
    );
}