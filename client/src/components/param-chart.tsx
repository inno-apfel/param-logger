import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"

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

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import api from '@/lib/api'

import { useTank } from "@/hooks/useTank";

import { useState } from 'react'

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

type ParamChartProps = {
  param: Parameter
  refreshObservations: () => void
};

export function ParamChart({ param, refreshObservations }: ParamChartProps) {

  const { tank } = useTank();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateNew = async (e: React.FormEvent) => {

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const value = new FormData(form).get("value");

    try {
      const response = await api.post(
        `/tanks/${tank?.id}/observations`, 
        { value: value ? parseFloat(value.toString()): 0,
          param_id: param.id
        });

      console.log(response)
      if (response.data) {
        alert("Parameter creation successful!");
        refreshObservations()
        setDialogOpen(false);
      } else {
        alert("Parameter creation failed!");
      }
    } catch (error: unknown) {
      alert(error || "Parameter creation error");
    }
  };

  const dates = param.observations.map(obs => new Date(obs.recorded_at));
  const minDate = formatToDMY(Math.min(...dates.map(d => d.getTime())))
  const maxDate = formatToDMY(Math.max(...dates.map(d => d.getTime())))
  const values = param.observations.map(obs => obs.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  return (
      <Card className="m-2">
      <CardHeader>
        <div className="flex justify-between relative">
            <CardTitle>{param.name}</CardTitle>
            <Button variant="secondary" size="icon" className="absolute right-0 bg-blue-500 rounded-4xl">
                <Plus className="text-white size-6 font-extrabold"/>
            </Button>



            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              
              <DialogTrigger asChild>

                <Button variant="secondary" size="icon" className="absolute right-0 bg-blue-500 rounded-4xl">
                  <Plus className="text-white size-6 font-extrabold"/>
                </Button>

              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleCreateNew} className="space-y-4">
                <DialogHeader>
                  <DialogTitle>Record new observation</DialogTitle>
                  <DialogDescription>
                    Input todays testing result here
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" name="value" defaultValue={param.reference_value} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
                </form>
              </DialogContent>
          </Dialog>



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
