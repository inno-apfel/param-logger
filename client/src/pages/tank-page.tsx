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
      <TankProvider tankId={tankId}>
        <Navbar variant='dashboard'/>
        <TankHeader/>
        <div className="flex justify-center m-2">
          <div className="flex w-7xl">
            <Content/>
            <Sidebar/>
          </div>
        </div>
      </TankProvider>
    </>
  )
}

export default TankPage
