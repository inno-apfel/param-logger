import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'

import api from '@/lib/api'
import { type Parameter } from '@/types/prisma-models'
import { ParametersContext } from './context'

import errorLogger from '@/utils/errorLogger'


export const ParametersProvider = ({
  tankId,
  children,
}: {
  tankId: string;
  children: ReactNode;
}) => {

  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchParameter = async () => {
    try {
      const res = await api.get(
        `/tanks/${tankId}/observations`
    );
      setParameters(res.data);
    } catch (error: any) {
      errorLogger(error, 'alert');
      navigate('/my-parameters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParameter();
  }, [tankId]);

  const refreshParameters = async () => {
    setLoading(true);
    await fetchParameter();
  };

  return (
    <ParametersContext.Provider value={{ parameters, loading, refreshParameters }}>
      {children}
    </ParametersContext.Provider>
  );
};