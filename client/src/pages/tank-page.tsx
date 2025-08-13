import { useParams } from 'react-router-dom'

import { Content } from "@/components/content"
import { Navbar } from "@/components/nav-bar"
import { Sidebar } from "@/components/sidebar"
import { TankHeader } from "@/components/tank-header"
import { TankProvider } from '@/context/tank/provider';

function TankPage() {
  
  const { tankId } = useParams()

  return (
    <>
      <TankProvider tankId={tankId!}>
        <Navbar
          authenticatedPage={true}
          fontColor = 'white'
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
            }
          ]}
        />
        <TankHeader/>
        <div className='bg-[oklch(0.9738_0.0067_277.16)] min-h-screen'>
          <div className="flex justify-center">
            <div className="flex w-7xl">
              <Content/>
              <Sidebar/>
            </div>
          </div>
        </div>
      </TankProvider>
    </>
  )
}

export default TankPage
