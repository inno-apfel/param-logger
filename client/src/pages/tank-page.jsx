import { Content } from "@/components/content"
import { Sidebar } from "@/components/sidebar"
import { TankHeader } from "@/components/tank-header"
import { Navbar } from "@/components/nav-bar"


function TankPage() {

  return (
    <>
      <Navbar/>
      <TankHeader/>
      <div className="flex justify-center m-2">
        <div className="flex w-7xl">
          <Content/>
          <Sidebar/>
        </div>
      </div>
    </>
  )
}

export default TankPage
