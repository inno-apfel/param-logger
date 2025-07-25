import { useState, useEffect } from 'react'
import { Plus } from "lucide-react"

import { Card } from "@/components/ui/card"

import CreateEntityDialog from '@/components/create-entity-dialog'
import { ParamChart } from "@/components/param-chart"

import api from '@/lib/api'
import { useTank } from "@/hooks/useTank";
import { type Parameter } from '@/types/prisma-models'

/**
 * Main content block for tanks dashboard
 * Displays a chart for each of the tank's parameters
 * And add new parameter button 
 */
function Content() {

  const { tank } = useTank();
  const [parameters, setParameters] = useState<Parameter[]>([]);

  useEffect(() => {
    if (!tank) return
    fetchObservations();
  }, [tank]);

  async function fetchObservations() {
    const response = await api.get(`/tanks/${tank?.id}/observations`);
    setParameters(response.data);
  };

  return (
    <div className="grid grid-cols-2 grow-5">

      {/* <Card className="col-span-2 m-2 shadow-none">
        <CardHeader>
          <CardTitle>
              Stuff
          </CardTitle>
          <hr className="-mx-6 mt-4  border-gray-100" />
        </CardHeader>
        <CardContent>
            Content
        </CardContent>
      </Card> */}
     
      {parameters.map((param: Parameter) => (
        
        <ParamChart 
          key={param.id} 
          param={param}
          refreshObservations={fetchObservations}
        />
  
      ))}

      <CreateEntityDialog 
        fields={[
          {name: 'param_name', label: 'Name', defaultValue: 'Salinity'},
          {name: 'reference_value', label: 'Reference Value', defaultValue: '1.025', type: 'number'},
          {name: 'unit_of_measure', label: 'Unit of Measure', defaultValue: 'SG'}
        ]}
        postUrl={`/tanks/${tank?.id}/parameters`}
        itemName={'Parameter'}
        parent_id={{name: 'tank_id', value:tank?.id}}
        refreshData={fetchObservations}
      >
        <Card className="m-2 bg-transparent border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
          <Plus className="text-gray-400 size-10"/>
          <span className="text-gray-600 font-medium">Add New Parameter</span>
          <span className="text-gray-400 text-sm">Click to create</span>
        </Card>
      </CreateEntityDialog>

      </div>
  )
}

export { Content }

