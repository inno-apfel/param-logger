import { useState } from 'react'
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

import { TriangleExclamation } from '@/components/icons'
import { useUser } from '@/hooks/useUser'
import api from '@/lib/api'
import errorLogger from '@/utils/errorLogger'

function DeleteAccount() {

  const { user, logout } = useUser();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const handleDelete = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
          await api.delete(
              `/users/${user?.id}`,
          );
          alert('Account Succesfully Deleted')
          navigate('/')
          await logout()
          setErrors([]);
      } 
      catch (error: any) {
          const caught_errors = errorLogger(error, 'alert');
          setErrors(caught_errors);
      }
  }

  return (
    <div className="pt-6">
      <div className="mb-5 flex items-center gap-3">
        <h2 className="text-md font-medium">
          Delete Account
        </h2>
      </div>
      <div className="rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-red-50/50 p-5 ">
        <div className="flex items-start">
          <div className="mr-4 flex-shrink-0 rounded-full bg-red-100 p-2">
            <TriangleExclamation className="h-5 w-5 fill-red-700" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-red-800">
              Warning: This action is irreversible
            </h3>
            <div className="mt-3 text-sm text-red-700">
              <p className="mb-2 font-medium text-xs">
                Deleting your account will permanently remove all your data,
                including:
              </p>
              <ul className="ml-5 mt-2 list-disc space-y-1.5 text-xs">
                <li>
                  Profile information
                </li>
                <li>
                  Tanks, parameters, and observations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
      <div className="mt-6 flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="bg-gradient-to-r from-red-800 to-red-900 transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-lg"
            >
              Delete My Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-800 to-red-900 transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-lg"
              >
                Delete My Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export { DeleteAccount }