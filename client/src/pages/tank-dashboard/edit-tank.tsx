import { UploadIcon, TrashIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Card } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from '@/components/date-picker';

import { useTank } from '@/hooks/useTank';
import api from '@/lib/api'
import errorLogger from '@/utils/errorLogger'


export function EditTank() {
  
    const { tank, refreshTank } = useTank();

    return (
        tank &&
        <>
            <UpdateTankDialog
                fields={[
                    {name: 'banner', label: 'Banner Image', placeholder: '', type: 'file'},
                    {name: 'name', label: 'Name', placeholder: tank.name},
                    {name: 'gallons', label: 'Gallons', placeholder: String(tank.gallons), type: 'number'},
                    {name: 'setup_date', label: 'Setup Date', placeholder: '', type: 'date'},
                    
                ]}
                resourceUrl={`/tanks/${tank?.id}`}
                itemName={'Tank'}
                refreshData={refreshTank}
                >
                <Button variant="secondary" className="absolute -top-24.5 -right-5 text-xs h-8 rounded-sm">
                    Edit
                </Button>
            </UpdateTankDialog>
            
        </>
    )
}

type Field = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};

type Props = {
    fields: Field[], 
    resourceUrl: string, 
    itemName: string, 
    refreshData: () => void, 
    children: ReactNode;
}

function UpdateTankDialog({fields, resourceUrl, itemName, refreshData, children}: Props) {

    const navigate = useNavigate();
    const [dates, setDates] = useState<{ [key: string]: Date }>({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0])
    }

    const handleUpdate = async (e: React.FormEvent) => {

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const rawFormData = new FormData(form);

        const formData = new FormData();

        fields.forEach(({ name, type }) => {
            // handle dates seperately since date inputs are handled with custom state and selector
            // to circumvent <Input type=date>'s default styling
            if (type === 'date'){
                const date = dates[name];
                if (date){
                    formData.append(name, String(dates[name]));
                }
                return 
            }
            const value = rawFormData.get(name);
            if (value === null || value === "") return;
            if (type === "number") {
                formData.append(name, String(parseFloat(String(value))));
            } else if (type === "date") {
                const [year, month, day] = (value as string).split("-").map(Number);
                const date = new Date(year, month - 1, day);
                formData.append(name, date.toISOString());
            } else if (type === "file") {
                formData.append(name, value);
            } else {
                formData.append(name, String(value));
            }
        });

        try {
            await api.put(
                resourceUrl,
                formData,
                { 
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            );
            refreshData();
            setDialogOpen(false); 
            setErrors([]);
        } 
        catch (error: any) {
            const caught_errors = errorLogger(error, 'alert');
            setErrors(caught_errors);
        }
    };

    const handleDateChange = (name: string, value: Date) => {
        setDates(prev => ({ ...prev, [name]: value }));
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.delete(
                resourceUrl,
            );
            alert('Tank Succesfully Deleted')
            navigate('/my-tanks')
            setErrors([]);
        } 
        catch (error: any) {
            const caught_errors = errorLogger(error, 'alert');
            setErrors(caught_errors);
        }
    }

    return (
          <Dialog 
              open={dialogOpen} 
              onOpenChange={(isOpen) => {
                  if (!isOpen){
                      setFile(null);
                  }
                  setDialogOpen(isOpen);
                  setErrors([]);
              }}
          >
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleUpdate} className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Update {itemName}</DialogTitle>
                    <DialogDescription>
                        Click save when you're done.
                        {errors.length > 0 ? 
                        <div className='text-red-500 text-muted-foreground text-to center text-xs'>
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

                {fields.map(({ name, label, placeholder, type='text' }) => {
                    if (type === 'file'){
                        return (
                            <div className="grid gap-3">
                                <Label htmlFor={name}>{label}</Label>
                                <Label
                                    htmlFor={name}
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-2">
                                        <UploadIcon className="w-8 h-8 text-gray-400" />
                                        <p className="text-sm text-gray-500 ">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                    </div>
                                    <Input id={name} name={name} type={type} className="hidden" onChange={handleFileChange} />
                                </Label>
                                {file &&
                                <div className='w-full'>
                                    <div className="flex items-center justify-between">
                                        <div className="max-w-93">
                                            <p className="font-medium truncate">{file?.name}</p>
                                            <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        )
                    }
                    // handle incremenet steps for numerical inputs
                    let step: number | undefined;
                    if (type === 'number'){
                        const mantissa = placeholder.split('.')[1];
                        const power = mantissa ? -mantissa.length : 0
                        step = Math.pow(10, power)
                    }
                    return (
                            <div className="grid gap-3">
                                <Label htmlFor={name}>{label}</Label>
                                {type === 'date' ? (
                                    <DatePicker 
                                        date={dates[name]}
                                        setDate={(date: Date) => handleDateChange(name, date)}
                                        className="shadow-xs"
                                    />
                                ): (
                                    <Input id={name} name={name} type={type}  step={step} placeholder={placeholder} />
                                )}
                            </div>
                        )
                })}

                <DialogFooter>
                    <div className="flex justify-between w-full">
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <TrashIcon className="ml-2 h-8 w-4 hover:stroke-destructive"/>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the tank and remove it&#39;s data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={handleDelete}
                                className="bg-gradient-to-r from-red-800 to-red-900 transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-lg"
                            >
                                Delete Tank
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                        
                        <div className="flex gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </div>
                    </div>
                </DialogFooter>
            </form>
          </DialogContent>

      </Dialog>
    )
}
