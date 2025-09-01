import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button'

import CreateEntityDialog from "@/components/create-entity-dialog";
import { Navbar } from "@/components/nav-bar";
import { SiteFooter } from "@/components/site-footer";
import { Content } from "./content";
import { Sidebar } from "./sidebar";
import { TankHeader } from "./tank-header";
import { EditTank } from "./edit-tank";

import { TankProvider } from '@/context/tank/provider';

function TankPage() {
  
  const { tankId } = useParams()

  return (
    <>
      <TankProvider tankId={tankId!}>
        <Navbar
          authenticatedPage={true}
          fontColor = 'text-white'
          bgAlwaysSolid={false}
          scrollTransitionThreshold={150}
          navItems={[
            {
              label: 'My Tanks', 
              to_url: '/my-tanks', 
              content: [
                {
                  label: 'Test Tank', 
                  to_url: '/dashboard/25302a04-139c-47ef-8ced-7754aac35c4a'
                },
                {
                  label: 'Test Tank', 
                  to_url: '/dashboard/25302a04-139c-47ef-8ced-7754aac35c4a'
                },
                {
                  label: 'Test Tank', 
                  to_url: '/dashboard/25302a04-139c-47ef-8ced-7754aac35c4a'
                }
              ]
            },
            {
              label: 'Chat', 
              to_url: '/chat', 
            }
          ]}
        />
        <TankHeader/>
        <div className='bg-[oklch(0.9738_0.0067_277.16)] min-h-177'>
          <div className="flex justify-center">
            <div className="flex w-7xl relative">
              <Content/>
              <Sidebar/>
              <EditTank/>
            </div>
          </div>
        </div>
        <SiteFooter />
      </TankProvider>
    </>
  )
}

export default TankPage
