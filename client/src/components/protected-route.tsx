import { useUser } from '@/hooks/useUser';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();

    if (loading) return null;

    if (!user) {
        alert('Not Logged In');
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}