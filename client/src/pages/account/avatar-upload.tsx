import { UploadIcon } from 'lucide-react'
import { useState } from 'react'

import { 
    Avatar, 
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

import { Camera } from '@/components/icons'

import { useUser } from '@/hooks/useUser'
import api from '@/lib/api'
import errorLogger from '@/utils/errorLogger'


function AvatarUpload() {

    const { user, refreshUser } = useUser();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    
    const handleFileChange = (e: any) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!file){
            return
        }

        const formData = new FormData();
        formData.append("avatar", file)
        try {
            await api.put(
                `/users/${user?.id}/avatar`,
                formData, 
                { 
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            );
            refreshUser();
            setDialogOpen(false);
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
                <Avatar className="size-12 relative group" >
                    <AvatarImage src={user?.avatar} onClick={()=>{}}/>
                    <AvatarFallback className="text-black bg-white">CU</AvatarFallback>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bottom-1/2 h-20 w-20 opacity-80 group-hover:bg-gray-500">
                        <Camera className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bottom-1/2 fill-transparent opacity-100 group-hover:fill-gray-200 h-6"/>
                    </div>
                </Avatar>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Profile picture</DialogTitle>
                        <DialogDescription>
                            A picture helps people recognize you and lets you know when you’re signed in to your account
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
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
                            <Input id="dropzone-file" name="file" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>

                    {errors.length > 0 ? 
                        <div className='text-red-500 text-muted-foreground text-center text-xs'>
                            <br></br><br></br>
                            {errors.map((message) => {
                                return (
                                <>
                                    <Card className="m-0 rounded-md py-4 px-8 bg-red-100 border border-red-300">
                                        <div className="flex justify-between">
                                            {message}
                                        </div>
                                    </Card>
                                    <br/>
                                </>
                                )
                            })}
                        </div>
                        : null}

                    <DialogFooter>
                        {file ? (
                            <div className='w-full'>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{file?.name}</p>
                                        <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                    <Button type="submit">Upload</Button>
                                </div>
                            </div>
                        ): (
                            <Button variant="outline" className="shadow-none">Remove Picture</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export { AvatarUpload }

