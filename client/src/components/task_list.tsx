import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon as CalendarIcon} from 'lucide-react'

import { DatePicker } from '@/components/date-picker';

import { type Todo } from '@/types/prisma-models'

export function TaskList({tasks}: {tasks: Todo[]}) {

  return (
    <Card className="shadow-none min-w-100">
    
        <CardHeader>
            <CardTitle className="">Task List</CardTitle>
            <CardDescription>Add new tasks to your to-do list</CardDescription>

        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <hr></hr>

            {/* Today */}
            <CardTitle className="">Today</CardTitle>
            <CardDescription>Complete these today</CardDescription>
            {[1,2].map(()=>{
                return (
                    <>
                        <div className="flex items-center justify-between p-1 rounded-lg ">
                            <div className="flex items-center gap-2">
                                <Checkbox/>
                                <label className="ml-3">
                                    Water Change
                                </label>
                            </div>
                            
                            <div className="flex items-center text-sm">
                                <CalendarIcon className="h-4 stroke-red-700"/> 
                                <p className="text-red-700">
                                    YESTERDAY
                                </p>
                                <TrashIcon className="ml-10 h-8 w-4 mr-4" />
                            </div>
                        </div>
                    </>
                )
            })}

            {/* Later */}
            <CardTitle className="">Later</CardTitle>
            <CardDescription>Future tasks</CardDescription>
            {[1,2,3,4,5].map(()=>{
                return (
                    <>
                        <div className="flex items-center justify-between p-1 rounded-lg ">
                            <div className="flex items-center gap-2">
                                <Checkbox/>
                                <label className="ml-3">
                                    Water Change
                                </label>
                            </div>
                            
                            <div className="flex items-center text-sm">
                                <CalendarIcon className="h-4 stroke-blue-600"/> 
                                <p className="text-blue-600">
                                    THURSDAY
                                </p>
                                <TrashIcon className="ml-10 h-8 w-4 mr-4" />
                            </div>
                        </div>
                    </>
                )
            })}

            <hr></hr>
        </CardContent>
        <CardFooter className="gap-4 flex-col">
            <form className="flex-col w-full gap-2">
                <div>
                    <Label className="mb-3 ml-1">
                        Task
                    </Label>
                    <Input
                        id="username"
                        type="username"
                        placeholder="New Task"
                        required
                        className="shadow-none"
                    />
                </div>
                <div className="flex gap-3 mt-3">
                    <div>
                        <Label className="mb-3 ml-1">
                            Complete by
                        </Label>
                        <DatePicker />
                    </div>
                    <div>
                        <Label className="mb-3 ml-1">
                            Repeat
                        </Label>
                        <Select>
                            <SelectTrigger className="w-[180px] shadow-none">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="never">Never</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="mt-6.5">
                        Add
                    </Button>
                </div>
            </form>
        </CardFooter>
    </Card>
  )
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}