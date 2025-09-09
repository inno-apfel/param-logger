import * as d3 from "d3";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ActionsTakenHeatmap } from './actions-taken-heatmap'
import { columns, ObservationsTable } from "./observations-table"
import { NewObservations } from "./new-observations"

import { useParameters } from "@/hooks/useParameters";
import { type ObservationWithParameter } from "@/types/prisma-models"

 
function AnalyticsSummary() {

    const { parameters } = useParameters();
    const observationsWithParam: ObservationWithParameter[] = parameters.flatMap(
        (param) =>
            param.observations.map((obs) => ({
            ...obs,
            parameter_name: param.name,
            unit_of_measure: param.unit_of_measure,
            }))
    );

  return (
    <Card className="mx-2 mt-4">
        <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
                Track your tank&#39;s water chemistry and test results.
            </CardDescription>
            <hr className="mt-4" />
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
            <ActionsTakenHeatmap />
            <hr className="-mt-2" />
            <div className="flex gap-2">
                <NewObservations/>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="text-xs h-8">
                            Check Observations
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                        <DialogHeader>
                            <DialogTitle>Observations</DialogTitle>
                            <DialogDescription>
                                View and manage your logged data in a tabular form.
                            </DialogDescription>
                        </DialogHeader>
                            <ObservationsTable columns={columns} data={observationsWithParam} />
                    </DialogContent>
                </Dialog>
            </div>
        </CardContent>
    </Card>
  )
}

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}:{
  data: number[],
  width?: number,
  height?: number,
  marginTop?: number,
  marginRight?: number,
  marginBottom?: number,
  marginLeft?: number
}) {

  const x = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
    .domain(d3.extent(data) as [number, number])
    .range([height - marginBottom, marginTop]);

  const line = d3.line<number>()
    .x((_, i) => x(i))
    .y(d => y(d));

  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth={1.5} d={line(data) || undefined} />
      <g fill="white" stroke="currentColor" strokeWidth={1.5}>
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r={2.5} />))}
      </g>
    </svg>
  );
}

export { AnalyticsSummary }