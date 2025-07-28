import { 
  CartesianGrid, 
  Line, LineChart, 
  ReferenceLine, 
  XAxis, 
  YAxis } from "recharts"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import CreateEntityDialog from '@/components/create-entity-dialog'

import { useTank } from "@/hooks/useTank";
import { type Parameter } from '@/types/prisma-models'
import { formatToDMY } from '@/utils/date'

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

export function ParamChart({ param, refreshObservations }: { param: Parameter, refreshObservations: () => void }) {

  const { tank } = useTank();

  const dates = param.observations.map(obs => new Date(obs.recorded_at));
  const minDate = formatToDMY(Math.min(...dates.map(d => d.getTime())))
  const maxDate = formatToDMY(Math.max(...dates.map(d => d.getTime())))

  const values = param.observations.map(obs => obs.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  return (
      <Card className="m-2 grow-1 aspect-[5/2]">
        <CardHeader>
          <div className="flex justify-between relative">
              <CardTitle>{param.name}</CardTitle>
              <Button variant="secondary" size="icon" className="absolute right-0 bg-blue-500 rounded-4xl">
                  <Plus className="text-white size-6 font-extrabold"/>
              </Button>

              <CreateEntityDialog
                fields={[
                  {name: 'value', label: 'Value', defaultValue: '1.025', type: 'number'}
                ]}
                postUrl={`/tanks/${tank?.id}/observations`}
                itemName={'Observation'}
                parent_id={{name: 'param_id', value:param.id}}
                refreshData={refreshObservations}
              >
                <Button variant="secondary" size="icon" className="absolute right-0 bg-blue-500 rounded-4xl">
                  <Plus className="text-white size-6 font-extrabold"/>
                </Button>
              </CreateEntityDialog>

          </div>
          <CardDescription>{minDate} - {maxDate}</CardDescription>
        </CardHeader>
      <CardContent className="h-full">

        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={param.observations}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="recorded_at"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatToDMY(value)}/>
            <YAxis 
                domain={[minVal, maxVal]}
                dataKey="value"
                tickLine={false}
                axisLine={false} 
                tickMargin={0}
                width={25}/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}/>
            <ReferenceLine
                y={param.reference_value}
                stroke="orange"
                strokeDasharray="4 2"
                label={{ value: '', position: 'bottom', fill: 'red', fontSize: 12 }}/>
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}/>
          </LineChart>
        </ChartContainer>

      </CardContent>
    </Card>
  )
}
