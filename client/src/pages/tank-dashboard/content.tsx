import { useParams } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Analytics } from './analytics'
import { TankProfile } from './tank-profile'

import { ParametersProvider } from '@/context/parameters/provider';

/**
 * Main content block for tanks dashboard
 * Displays a chart for each of the tank's parameters
 * And add new parameter button 
 */
function Content() {

  const { tankId } = useParams()

  return (
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="absolute -top-24.5 left-2">
          <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="w-full">
          <ParametersProvider tankId={tankId!}>
            <Analytics />
          </ParametersProvider>
        </TabsContent>
        <TabsContent value="profile" className="w-full">
          <TankProfile />
        </TabsContent>
      </Tabs>
  )
}

export { Content }