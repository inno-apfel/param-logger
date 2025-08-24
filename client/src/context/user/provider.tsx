import { useEffect, useState, type ReactNode } from 'react';

import api from '@/lib/api'
import { UserContext } from './context'
import { type User } from '@/types/prisma-models'

import errorLogger from '@/utils/errorLogger'

export const UserProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get(
        '/auth/me'
      );
      setUser(res.data);
    } catch (error: any) {
      errorLogger(error, 'log');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [])

  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  const logout = async () => {
    await api.post('/auth/logout', {});
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};