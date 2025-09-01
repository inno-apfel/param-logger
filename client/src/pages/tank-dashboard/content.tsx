import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Analytics } from './analytics'
import { TankProfile } from './tank-profile'

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
      <TabsContent value="analytics" className="w-full">
        <Analytics />
      </TabsContent>
      <TabsContent value="profile" className="w-full">
        <TankProfile />
      </TabsContent>
    </Tabs>
  )
}

export { Content }