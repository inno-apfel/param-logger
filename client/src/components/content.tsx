import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ParamChart } from "@/components/param-chart"

import api from '@/lib/api'

import { useState, useEffect } from 'react'

import { type Parameter } from '../types/prisma-models'

import { useTank } from "@/hooks/useTank";

function Content() {

  const { tank } = useTank();

  const [parameters, setParameters] = useState<Parameter[]>([]);

  const fetchAPI = async () => {
    const response = await api.get(`/tanks/${tank?.id}/observations`);
    setParameters(response.data);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="grid grid-cols-2 grow-5">

      <Card className="col-span-2 m-2 shadow-none">
        <CardHeader>
          <CardTitle>
              Stuff
          </CardTitle>
          <hr className="-mx-6 mt-4  border-gray-100" />
        </CardHeader>
        <CardContent>
            Content
        </CardContent>
      </Card>
     
      {parameters.map((param: Parameter) => (
        
          <ParamChart 
          key={param.id} 
          {... param}
        />
  
      ))}

      </div>
  )
}

export { Content }

