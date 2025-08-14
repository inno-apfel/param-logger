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

    const [dialogOpen, setDialogOpen] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleCreateNew = async (e: React.FormEvent) => {

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const payload: Record<string, any> = {};

        fields.forEach(({ name, type }) => {
            let value = formData.get(name);
            let processed_val; 
            if (type === 'number') {
                processed_val = parseFloat(String(value))
            } else if (type ==='date' && typeof value === "string") {
                processed_val = new Date(value);
            } else {
                processed_val = String(value);
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
                            <Input id={name} name={name} type={type}  step={step} defaultValue={defaultValue} />
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