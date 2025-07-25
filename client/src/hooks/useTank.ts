import { useContext } from 'react'

import { TankContext } from '@/context/tank/context'

export const useTank = () => {
  const context = useContext(TankContext);
  if (!context) throw new Error("useTank must be used within a TankProvider");
  return context;
};