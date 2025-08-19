import { useState, useEffect } from 'react'
import { type JSONContent } from "@tiptap/core";

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

import api from '@/lib/api'
import { useTank } from "@/hooks/useTank";
import errorLogger from '@/utils/errorLogger'
import { type TankJournal } from '@/types/prisma-models'

import { ISOToMMDDYY } from '@/utils/date'

function TankProfile() {

    const { tank } = useTank();
    const [profile, setProfile] = useState<TankJournal | null>(null);
    const [textInput, setTextInput] = useState<JSONContent | null>(null);

    useEffect(() => {
        if (!tank) return
        fetchProfile();
    }, [tank]);

    async function fetchProfile() {
        try {
            const response = await api.get(`/tanks/${tank?.id}/journal`);
            setProfile(response.data);
        } 
        catch (error: any) {
            errorLogger(error, 'log');
        } 
    };

    const handleUpdate = async () => {
        console.log(profile)
        if (textInput){
            try {
                await api.put(
                    `/tanks/${tank?.id}/journal`,
                    {
                        content: textInput
                    }
                );
                alert('Success')
                fetchProfile(); 
            } 
            catch (error: any) {
                errorLogger(error, 'alert');
            }
        }
        else{
            alert('Make some change to the template first')
        }
    }

  return (
    <div className="pt-2">
        <Card className="col-span-2 m-2 shadow-none grow">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>View and edit your tank&apos;s information.</CardDescription>
                <hr className="mt-4" />
            </CardHeader>
            <CardContent>
                <SimpleEditor editable={false} content={profile?.content} onChange={setTextInput}/>
                <hr className="mt-10 mb-6" />
                <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    {profile && 'Last Updated: ' + ISOToMMDDYY(profile.updated_at, true)}
                </p>                
                <Button onClick={handleUpdate}>
                    Save Changes
                </Button>
                </div>      
            </CardContent>
        </Card>
    </div>
  )
}

export { TankProfile }

