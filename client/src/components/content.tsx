import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Analytics } from './analytics'

/**
 * Main content block for tanks dashboard
 * Displays a chart for each of the tank's parameters
 * And add new parameter button 
 */
function Content() {

  return (
    <Tabs defaultValue="profile" className="relative w-full">
      <TabsList className="absolute -top-24.5 left-2">
        <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
        <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="analytics">
        <Analytics />
      </TabsContent>
      <TabsContent value="profile">
        <div className="grid grid-cols-2 grow-5 pt-2">
          <Card className="col-span-2 m-2 shadow-none grow">
            <CardHeader>
              <CardTitle>
                  Profile
              </CardTitle>
              <hr className="-mx-6 mt-4  border-gray-100" />
            </CardHeader>
            <CardContent>
                JSON Content
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export { Content }