
import { useState } from 'react'
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { DatePicker } from "@/components/date-picker"

import api from "@/lib/api"
import { useParameters } from "@/hooks/useParameters"
import errorLogger from '@/utils/errorLogger'

type ObservationInput = {
  recorded_at: string
  observations: { parameter_id: string; value: number }[]
}

export function NewObservations() {
  const { parameters, refreshParameters } = useParameters();
  const [errors, setErrors] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { register, handleSubmit, setValue, watch} = useForm<ObservationInput>({
    defaultValues: {
      recorded_at: new Date().toISOString(),
      observations: parameters.map((parameter) => ({
        parameter_id: parameter.id,
        value: undefined,
      })),
    },
  })

  const onSubmit = async (data: ObservationInput) => {
    const filtered = {
        ...data,
        observations: data.observations.filter(
            (o) => !isNaN(o.value)
        ),
    }
    // prevent submit if literally nothing was filled
    if (filtered.observations.length === 0) {
        setErrors(['At least one parameter value is required'])
        return
    }

    
    try {
        await api.post(
            `/observations/batch`, 
            filtered
        )
        alert(JSON.stringify(filtered))
        refreshParameters(); 
        setDialogOpen(false); 
        setErrors([]);
    } 
    catch (error: any) {
        const caught_errors = errorLogger(error, 'alert');
        setErrors(caught_errors);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>New Observations</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>New Observations</DialogTitle>
            <DialogDescription>
              Log multiple test results at one time.
              {errors.length > 0 ? 
                <div className='text-red-500 text-muted-foreground text-center text-xs'>
                    <br></br><br></br>
                    {errors.map((message) => {
                        return (
                        <>
                            <Card className="rounded-md py-4 px-8 bg-red-100 border border-red-300">
                            <div className="flex justify-between">
                                <div>
                                {message}
                                </div>
                            </div>
                            </Card>
                            <br/>
                        </>
                        )
                    })}
                </div>
                : null}
            </DialogDescription>
          </DialogHeader>

          {/* Recorded At (Date) */}
          <Label>Date Recorded</Label>
          <DatePicker
            date={new Date(watch("recorded_at"))}
            setDate={(date: Date) =>
              setValue("recorded_at", date.toISOString())
            }
            className="shadow-xs"
          />

          {/* Observations */}
          <div className="grid grid-cols-2 gap-4">
            {parameters.map((parameter, i) => (
              <div key={parameter.id} className="grid gap-3">
                <Label htmlFor={`observations.${i}.value`}>
                  {parameter.name} value
                </Label>
                <Input
                    type="number"
                    step="any"
                    placeholder={String(parameter.reference_value)}
                    {...register(`observations.${i}.value`, { valueAsNumber: true })}
                />
                {/* hidden parameter_id so it gets submitted */}
                <Input
                  type="hidden"
                  value={parameter.id}
                  {...register(`observations.${i}.parameter_id`)}
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="default" type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
