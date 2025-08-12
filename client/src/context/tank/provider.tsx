import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'

import api from '@/lib/api'
import { type Tank } from '@/types/prisma-models'
import { TankContext } from './context'

import errorLogger from '@/utils/errorLogger'


export const TankProvider = ({
  tankId,
  children,
}: {
  tankId: string;
  children: ReactNode;
}) => {

  const [tank, setTank] = useState<Tank | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchTank = async () => {
    try {
      const res = await api.get(
        `/tanks/${tankId}`
    );
      setTank(res.data);
    } catch (error: any) {
      errorLogger(error, 'alert');
      navigate('/my-tanks');
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