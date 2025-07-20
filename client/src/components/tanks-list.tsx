import api from '../lib/api'
import { useState, useEffect } from 'react'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Tank } from '../types/prisma-models'
import { Link } from 'react-router-dom'

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

function TanksList() {

  const [tanks, setTanks] = useState<Tank[] | null>(null);

  const fetchTanks = async () => {
    try {
      const res = await api.get(
        '/tanks'
    );
      setTanks(res.data);
    } catch {
      setTanks(null);
    } 
  };

  useEffect(() => {
    fetchTanks()
  })

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateNew = async (e: React.FormEvent) => {

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const tank_name = new FormData(form).get("name");
    console.log(tank_name)
    try {
      const response = await api.post(`/tanks`, { tank_name: tank_name});
      if (response.data) {
        alert("Tank creation successful!");
        setDialogOpen(false);
      } else {
        alert("Tank creation failed!");
      }
    } catch (error: unknown) {
      alert(error || "Tank creation error");
    }
  };

  return (
      <div className="h-screen bg-white">
        <div className="h-18 bg-white">
        </div>

        <div className="flex justify-center m-2 ">
          <div className="flex flex-col w-7xl items-center gap-3">

            {tanks?.map(tank => (
              <Link to={`/dashboard/${tank.id}`}>
                <Card key={tank.id} className="bg-blue-400 w-4xl h-40 py-3">
                  <CardHeader className="w-4xl px-3">
                    <p className="bg-white rounded-lg py-2 px-4 w-fit font-bold">
                      {tank.name}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              
                <DialogTrigger asChild>

                  <Card className="w-4xl h-40 py-0 bg-transparent border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-gray-600 font-medium">Add New Tank</span>
                    <span className="text-gray-400 text-sm">Click to create</span>
                  </Card>

                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleCreateNew} className="space-y-4">
                  <DialogHeader>
                    <DialogTitle>Create new tank</DialogTitle>
                    <DialogDescription>
                      Create your tank here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 pb-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue="My Tank" />
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
        </div>

        

        



      </div>
  );
  
}

export default TanksList;