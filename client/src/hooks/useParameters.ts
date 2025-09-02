import { useContext } from 'react'

import { ParametersContext } from '@/context/parameters/context'

export const useParameters = () => {
  const context = useContext(ParametersContext);
  if (!context) throw new Error("useParameters must be used within a ParametersProvider");
  return context;
};