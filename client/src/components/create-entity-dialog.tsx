import api from '@/lib/api'
import { useState, type ReactNode } from 'react'

import { Button } from "@/components/ui/button"
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
import errorLogger from '@/utils/errorLogger'

type Field = {
  name: string;
  label: string;
  defaultValue: string;
  type?: string;
};

type ParentId = {
    name: string;
    value: string | undefined;
}

type Props = {
    fields: Field[], 
    postUrl: string, 
    itemName: string, 
    parent_id?: ParentId, 
    refreshData: () => void, 
    children: ReactNode;
}

function CreateEntityDialog({fields, postUrl, itemName, parent_id, refreshData, children}: Props) {

    const [dates, setDates] = useState<{ [key: string]: Date }>({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleCreateNew = async (e: React.FormEvent) => {

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const payload: Record<string, any> = {};

        fields.forEach(({ name, type }) => {
            let value = formData.get(name); // string | File | null
            let processed_val: any;

            // date values are stored in dates state not form input
            // custom date picker to avoid default input styling
            // formData.get() returns null for invalid keys
            if (type === 'date' && value === null) {
                processed_val = dates[name];
            } else if (type === 'number') {
                processed_val = value !== null ? parseFloat(String(value)) : null;
            } else {
                processed_val = value !== null ? String(value) : null;
            }

            payload[name] = processed_val;
        });
        
        if (parent_id) {
            payload[parent_id.name] = parent_id.value
        }
        try {
            await api.post(
                postUrl,
                payload
            );
            refreshData(); // refresh observations tank 
            setDialogOpen(false); // close dialog
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

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateNew} className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Create new {itemName}</DialogTitle>
                    <DialogDescription>
                        Create your {itemName} here. Click save when you're done.
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

                {fields.map(({ name, label, defaultValue, type='text' }) => {
                    // handle incremenet steps for numerical inputs
                    let step: number | undefined;
                    if (type === 'number'){
                        const mantissa = defaultValue.split('.')[1];
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
                                <Input id={name} name={name} type={type}  step={step} defaultValue={defaultValue} />
                            )}
                        </div>
                    )
                })}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
          </DialogContent>

      </Dialog>
    )
}

export default CreateEntityDialog