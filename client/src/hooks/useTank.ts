import { useContext } from 'react'
import { TankContext } from '../context/tank/context'

export const useTank = () => {
  const ctx = useContext(TankContext);
  if (!ctx) throw new Error("useTank must be used within a TankProvider");
  return ctx;
};