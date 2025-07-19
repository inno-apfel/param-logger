import { createContext } from 'react';
import { type Tank } from '../../types/prisma-models'

type TankContextType = {
  tank: Tank | null;
  loading: boolean;
  refreshTank: () => Promise<void>;
};

export const TankContext = createContext<TankContextType | null>(null);