import { CalendarIcon as CalendarIcon} from 'lucide-react'
import { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DatePicker } from '@/components/date-picker';
import { useTank } from "@/hooks/useTank";
import api from '@/lib/api'
import { type Task } from '@/types/prisma-models'
import errorLogger from '@/utils/errorLogger'

import {
    ISOToMMDD,
    distanceToDeadline,
    toLocalMidnight
} from '@/utils/date'

const ONE_DAY = 24 * 60 * 60 * 1000;

const repeatMapping = {
    'never': -1,
    'daily': 1,
    'weekly': 7,
    'biweekly': 14
};

export function TaskList() {

    const { tank } = useTank();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [repeat, setRepeat] = useState<Number | undefined>(undefined);

    useEffect(() => {
        if (!tank) return
        fetchTasks();
    }, [tank]);

    async function fetchTasks() {
        try {
            const response = await api.get(`/tanks/${tank?.id}/tasks`);
            setTasks(response.data);
            alert(JSON.stringify(response.data));
        } 
        catch (error: any) {
            errorLogger(error, 'log');
        } 
    };

    const handleCreateNew = async (e: React.FormEvent) => {

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const payload: Record<string, any> = {};

        let taskMessage = formData.get('task');
        let processed_val = String(taskMessage); 
        payload['message'] = processed_val;
        payload['deadline'] = toLocalMidnight(date as Date);
        payload['recur_interval_days'] = repeat;
        alert(JSON.stringify(payload))
        try {
            await api.post(
                `/tanks/${tank?.id}/tasks`,
                payload
            );
            fetchTasks(); 
            setErrors([]);
        } 
        catch (error: any) {
            const caught_errors = errorLogger(error, 'alert');
            setErrors(caught_errors);
        }
    };

    const handleDelete = async (task_id: String) => {
        try {
            await api.delete(
                `/tanks/${tank?.id}/tasks/${task_id}`,
            );
            fetchTasks(); 
            setErrors([]);
        } 
        catch (error: any) {
            errorLogger(error, 'alert');
        }
    }

    const setCompletionStatus = async (task_id: String, status: Boolean) => {
        try {
            await api.put(
                `/tanks/${tank?.id}/tasks/${task_id}`,
                {
                    completed: status
                }
            );
            fetchTasks(); 
            setErrors([]);
        } 
        catch (error: any) {
            errorLogger(error, 'alert');
        }
    }

    // Groupby tasks and process due date label
    const finishedTasks = [];
    const overdueTasks = [];
    const todaysTasks = [];
    const futureTasks = [];
    for (let i=0; i < tasks.length; i++){
        const tillDeadline = distanceToDeadline(tasks[i].deadline);
        if (tasks[i].completed){
            const label = (tillDeadline < -1*ONE_DAY) ? ISOToMMDD(tasks[i].deadline): ''
            const processed_task = Object.assign(tasks[i],{
                text_color: '',
                stroke_color: '',
                label: label
            })
            finishedTasks.push(processed_task)
        }
        else if (tillDeadline < 0){
            const label = (tillDeadline < -1*ONE_DAY) ? ISOToMMDD(tasks[i].deadline): 'YESTERDAY'
            const processed_task = Object.assign(tasks[i],{
                text_color: 'text-red-700',
                stroke_color: 'stroke-red-700',
                label: label
            })
            overdueTasks.push(processed_task)
        }
        else if (tillDeadline < ONE_DAY){
            const processed_task = Object.assign(tasks[i], {
                text_color: 'text-blue-600',
                stroke_color: 'stroke-blue-600',
                label: 'TODAY'
            })
            todaysTasks.push(processed_task)
        }
        else {
            const label = (tillDeadline < 2*ONE_DAY) ? 'TOMMOROW': ISOToMMDD(tasks[i].deadline)
            const processed_task = Object.assign(tasks[i],{
                text_color: 'text-gray-300',
                stroke_color: 'stroke-gray-300',
                label: label
            })
            futureTasks.push(processed_task)
        }
    }
    overdueTasks.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
    futureTasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  return (
    <Card className="shadow-none min-w-100">
        {/* List of Tasks */}
        <CardHeader>
            <CardTitle className="">Task List</CardTitle>
            <CardDescription>Add new tasks to your to-do list</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            {/* Horizontal break for tasks list */}
            {(tasks.length !== 0) && <hr></hr>}
            {/* Today */}
            <TaskGroup
                title="Overdue"
                subTitle="You forgot these"
                tasks={overdueTasks}
                handleDelete={handleDelete}
                setCompletionStatus={setCompletionStatus}
            />
            <TaskGroup
                title="Today"
                subTitle="Complete these today"
                tasks={todaysTasks}
                handleDelete={handleDelete}
                setCompletionStatus={setCompletionStatus}
            />
            <TaskGroup
                title="Later"
                subTitle="Future tasks"
                tasks={futureTasks}
                handleDelete={handleDelete}
                setCompletionStatus={setCompletionStatus}
            />
            <TaskGroup
                title="Completed"
                subTitle="You finished these"
                tasks={finishedTasks}
                handleDelete={handleDelete}
                setCompletionStatus={setCompletionStatus}
            />
            <hr></hr>
        </CardContent>
        {/* Create New Task Prompt */}
        <CardFooter className="gap-4 flex-col">
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
            <form onSubmit={handleCreateNew} className="flex-col w-full gap-2">
                <div>
                    <Label htmlFor="task" className="mb-3 ml-1">
                        Task
                    </Label>
                    <Input
                        id="task"
                        name="task"
                        type="task"
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
                        <DatePicker 
                            date={date}
                            setDate={setDate}
                        />
                    </div>
                    <div>
                        <Label className="mb-3 ml-1">
                            Repeat
                        </Label>
                        <Select onValueChange={(val)=>{
                            setRepeat(repeatMapping[val as keyof typeof repeatMapping])
                            }}>
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

function TaskGroup(
    {
        title, 
        subTitle, 
        tasks,
        handleDelete,
        setCompletionStatus
    }: 
    {
        title: String, 
        subTitle: String, 
        tasks: (Task & {
            text_color: string;
            stroke_color: string;
            label: string;
        })[],
        handleDelete: Function,
        setCompletionStatus: Function
}) {
  return tasks.length !== 0 ? (
    <>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
        {tasks.map((task)=>{
            return (
                <>
                    <div className="flex items-center justify-between p-1 rounded-lg ">
                        {/* Task */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={task.completed} 
                                onCheckedChange={(checked) => setCompletionStatus(task.id, Boolean(checked))} 
                            />
                            <label className={`ml-3 ${task.completed ? "line-through text-gray-500" : ""}`}>
                                {task.message}
                            </label>
                        </div>
                        {/* Label and Delete Button */}
                        <div className="flex items-center text-sm">
                            <div className={`flex items-center ${task.completed ? "opacity-0" : ""}`}>
                                <CalendarIcon className={`h-4 ${task.stroke_color}`}/> 
                                <p className={task.text_color}>
                                    {task.label}
                                </p>
                            </div>
                            <TrashIcon className="ml-10 h-8 w-4 mr-4 hover:stroke-muted-foreground" onClick={()=> handleDelete(task.id)}/>
                        </div>
                    </div>
                </>
            )
        })}
    </>
  ) : null
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