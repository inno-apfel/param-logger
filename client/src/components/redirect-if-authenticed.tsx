import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/hooks/useUser';

export function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {

    const navigate = useNavigate();
    const { user, loading } = useUser();

    if (loading) return null;

    useEffect(() => {
        if (user !== null){
            alert('Already Logged In');
            navigate('/my-tanks')
        }
    },[user])

    return <>{children}</>;
}