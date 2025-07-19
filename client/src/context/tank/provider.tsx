import { useEffect, useState, type ReactNode } from 'react';
import { TankContext } from './context'
import { type Tank } from '../../types/prisma-models'

import api from '../../lib/api'

export const TankProvider = ({
  tankId,
  children,
}: {
  tankId: string;
  children: ReactNode;
}) => {

  const [tank, setTank] = useState<Tank | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTank = async () => {
    try {
      const res = await api.get(
        `/tanks/${tankId}`
    );
      setTank(res.data);
    } catch {
      setTank(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTank();
  }, [tankId]);

  const refreshTank = async () => {
    setLoading(true);
    await fetchTank();
  };

  return (
    <TankContext.Provider value={{ tank, loading, refreshTank }}>
      {children}
    </TankContext.Provider>
  );
};