import { Button } from '@/components/ui/button'

import { TriangleExclamation } from '@/components/icons'

function DeleteAccount() {

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
      <div className="mt-6 flex justify-end">
        <Button
          variant="destructive"
          className="bg-gradient-to-r from-red-800 to-red-900 transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-lg"
        >
          Delete My Account
        </Button>
      </div>
    </div>
  )
}

export { DeleteAccount }