import { createContext } from 'react';

import { type Parameter } from '@/types/prisma-models'

type ParametersContextType = {
  parameters: Parameter[];
  loading: boolean;
  refreshParameters: () => Promise<void>;
};

export const ParametersContext = createContext<ParametersContextType | null>(null);