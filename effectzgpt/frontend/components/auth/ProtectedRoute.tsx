'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {ReactNode, useEffect} from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
    const { user, loading, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || (adminOnly && role !== 'admin'))) {
            router.push('/login');
        }
    }, [user, loading, role, adminOnly, router]);

    if (loading) {
        return <div>Loading...</div>;

    }

    if (!user || (adminOnly && role !== 'admin')) {
        return router.push('/login');
    }

    return <>{children}</>;
}