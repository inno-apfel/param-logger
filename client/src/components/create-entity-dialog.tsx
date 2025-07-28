import api from '@/lib/api'
import { useState, type ReactNode } from 'react'

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import errorLogger from '@/utils/errorLogger'

type Field = {
  name: string;
  label: string;
  defaultValue?: string;
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
            const parsedValue = (type === 'number') ? parseFloat(String(value)): String(value)
            payload[name] = parsedValue;
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
                        <div className='text-red-500 pb-2'>
                            {errors.map((message) => {
                                return <><br/>&lt;{message}&gt;</>
                            })}
                        </div>
                        : null}
                    </DialogDescription>
                </DialogHeader>

                {fields.map(({ name, label, defaultValue, type = 'text' }) => (
                    <div className="grid gap-3">
                        <Label htmlFor={name}>{label}</Label>
                        <Input id={name} name={name} type={type} defaultValue={defaultValue} />
                    </div>
                ))}

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