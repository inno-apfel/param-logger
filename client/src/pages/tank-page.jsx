import { Content } from "@/components/content"
import { Sidebar } from "@/components/sidebar"
import { TankHeader } from "@/components/tank-header"
import { Navbar } from "@/components/nav-bar"
import { TankProvider } from '@/context/tank/provider';
import { useParams } from 'react-router-dom'


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
