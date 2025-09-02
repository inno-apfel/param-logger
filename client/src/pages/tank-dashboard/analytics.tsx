import { Plus } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { AnalyticsSummary } from './analytics-summary'
import CreateEntityDialog from '@/components/create-entity-dialog'
import { ParamChart } from "./param-chart"

import { useTank } from "@/hooks/useTank";
import { useParameters } from "@/hooks/useParameters";
import { type Parameter } from '@/types/prisma-models'

/**
 * Main content block for tanks dashboard
 * Displays a chart for each of the tank's parameters
 * And add new parameter button 
 */
function Analytics() {

  const { tank } = useTank();
  const { parameters, refreshParameters } = useParameters();

  return (
    <>
      <AnalyticsSummary/>
      <div className="grid grid-cols-2 grow-5 pt-2">
        
        {parameters.map((param: Parameter) => (
          
          <ParamChart 
            key={param.id} 
            param={param}
            refreshObservations={refreshParameters}
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
          refreshData={refreshParameters}
        >
          <Card className="relative m-2 grow-1 aspect-[5/2] bg-transparent border-2 border-dashed border-gray-300 rounded-lg p-6  hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
              <CardHeader>
                  <div className="flex justify-between relative">
                    <CardTitle className='text-transparent'>
                      Hello
                    </CardTitle>
                  </div>
                <CardDescription className='text-transparent'>
                  World
                </CardDescription>
              </CardHeader>
            <CardContent className='h-full'>
              <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Plus className="text-gray-400 size-10"/>
                <span className="text-gray-600 font-medium">Add New Parameter</span>
                <span className="text-gray-400 text-sm">Click to create</span>
              </div>
            </CardContent>
          </Card>
        </CreateEntityDialog>
      </div>
    </>
    
  )
}

export { Analytics }