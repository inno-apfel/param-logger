import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Plus } from "lucide-react"

import { ParamChart } from "@/components/param-chart"

import api from '@/lib/api'

import { useState, useEffect } from 'react'

import { type Parameter } from '../types/prisma-models'

import { useTank } from "@/hooks/useTank";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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

function Content() {

  const { tank } = useTank();
  
  const [parameters, setParameters] = useState<Parameter[]>([]);

  const fetchAPI = async () => {
    const response = await api.get(`/tanks/${tank?.id}/observations`);
    setParameters(response.data);
  };

  

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateNew = async (e: React.FormEvent) => {

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const param_name = new FormData(form).get("param_name");
    const reference_value = new FormData(form).get("reference_value");
    const unit_of_measure = new FormData(form).get("unit_of_measure");
    alert([param_name, reference_value, unit_of_measure])

    try {
      const response = await api.post(
        `/tanks/${tank?.id}/parameters`, 
        { param_name: param_name,
          reference_value: reference_value ? parseFloat(reference_value.toString()): 0,
          unit_of_measure: unit_of_measure,
          tank_id: tank?.id
        });

      console.log(response)
      if (response.data) {
        alert("Parameter creation successful!");
        fetchAPI();
        setDialogOpen(false);
      } else {
        alert("Parameter creation failed!");
      }
    } catch (error: unknown) {
      alert(error || "Parameter creation error");
    }
  };

  useEffect(() => {
    if (!tank) return
    fetchAPI();
  }, [tank]);

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
          refreshObservations={fetchAPI}
        />
  
      ))}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              
          <DialogTrigger asChild>

            <Card className="m-2 bg-transparent border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
              <Plus className="text-gray-400 size-10"/>
              <span className="text-gray-600 font-medium">Add New Parameter</span>
              <span className="text-gray-400 text-sm">Click to create</span>
            </Card>

          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateNew} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create new parameter</DialogTitle>
              <DialogDescription>
                Create your parameter here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <Label htmlFor="param_name">Name</Label>
              <Input id="param_name" name="param_name" defaultValue="Salinity" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="reference_value">Reference Value</Label>
              <Input id="reference_value" name="reference_value" defaultValue="1.025" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="unit_of_measure">Unit of Measure</Label>
              <Input id="unit_of_measure" name="unit_of_measure" defaultValue="SG" />
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
  )
}

export { Content }

