import { createContext } from 'react';
import { type User } from '../../types/prisma-models'

type UserContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | null>(null);