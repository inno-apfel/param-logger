import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts"

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

import { type Parameter } from '../types/prisma-models'

import { formatToDMY } from '../utils/date'

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

export function ParamChart(param: Parameter) {

  const dates = param.observations.map(obs => new Date(obs.recorded_at));
  const minDate = formatToDMY(Math.min(...dates.map(d => d.getTime())))
  const maxDate = formatToDMY(Math.max(...dates.map(d => d.getTime())))

  return (
      <Card className="m-2">
      <CardHeader>
        <div className="flex justify-between relative">
            <CardTitle>{param.name}</CardTitle>
            <Button className="absolute right-0 bg-blue-500">Add</Button>
        </div>
        <CardDescription>{minDate} - {maxDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-min-30 w-full'>
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
                dataKey="value"
                tickLine={false}
                axisLine={false} 
                tickMargin={0}
                width={15}/>
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
