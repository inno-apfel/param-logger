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

import { columns, ObservationsTable } from "./observations-table"

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
        <CardContent>
            <div className="w-full bg-red-500 h-20 mb-6">
            </div>
            <div className="flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            New Observations
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                        <DialogHeader>
                            <DialogTitle>New Observations</DialogTitle>
                            <DialogDescription>
                                Log multiple test results at one time.
                            </DialogDescription>
                        </DialogHeader>
                            content
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            All Observations
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

export { AnalyticsSummary }