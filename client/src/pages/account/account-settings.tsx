import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { PictureIcon, Fingerprint, UserWithPen } from '@/components/icons'
import { AvatarUpload } from '@/pages/account/avatar-upload'

import { useUser } from '@/hooks/useUser'
import api from '@/lib/api'

function AccountSettings() {
    const { user, refreshUser } = useUser();

    return (
        <>
            <h1 className="text-2xl font-bold  text-balance mb-10">
                Account Settings
            </h1>

            <h2 className="text-md font-medium first:mt-0">
                Profile Information
            </h2>

            <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center my-5">
                <div>
                    <div className="text-sm flex gap-1 items-center mb-2">
                        <PictureIcon className="h-4 fill-gray-600"/>
                        <p className="font-medium text-sm">
                            Profile Picture
                        </p>
                    </div>
                    <p className="text-sm text-muted-foreground ml-3">
                        A profile picture helps personalize your account
                    </p>
                </div>
                <AvatarUpload />
            </div>

            <div className="bg-gray-100 p-3 rounded-md my-5">
                <div className="text-sm flex gap-1 items-center mb-2">
                    <Fingerprint className="h-4 fill-gray-600" />
                    <p className="font-medium text-sm">
                        Profile ID
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground ml-3">
                        {user!.id}
                    </p>
                </div>
                
            </div>

            <div className="bg-gray-100 p-3 rounded-md my-5">
                <div className="text-sm flex gap-1 items-center mb-2">
                    <UserWithPen className="h-4 fill-gray-600" />
                    <p className="font-medium text-sm">
                        Username
                    </p>
                    <div className="rounded-sm leading-none p-1 px-2 bg-gray-200 text-xs text-muted-foreground">
                        Current: {user!.username}
                    </div>
                </div>
                <Input className="bg-white shadow-none" placeholder={user!.username}/>
            </div>

            <hr />

            <div className="flex justify-end">
                <Button className="my-5 justify-end">
                    Save Changes
                </Button>
            </div>
        </>
    )
}

export { AccountSettings }

