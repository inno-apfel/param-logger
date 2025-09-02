import { 
  CartesianGrid, 
  Line, LineChart, 
  ReferenceLine, 
  XAxis, 
  YAxis } from "recharts"

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
      <Card className="m-2 grow-1 aspect-[5/2] relative">
        <CardHeader>
          <div className="flex justify-between relative">
              <CardTitle>{param.name}</CardTitle>
              <CreateEntityDialog
                fields={[
                  {name: 'value', label: 'Value', defaultValue: '1.025', type: 'number'},
                  {name: 'recorded_at', label: 'Date Recorded', defaultValue: '', type: 'date'}
                ]}
                postUrl={`/tanks/${tank?.id}/observations`}
                itemName={'Observation'}
                parent_id={{name: 'param_id', value:param.id}}
                refreshData={refreshObservations}
              >
                <Button size="icon" className="absolute right-0 bg-primary rounded-4xl">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="fill-white size-4">
                    <path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z"/>
                  </svg>
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
