import TanksList from '../components/tanks-list'
import { Navbar } from "@/components/nav-bar"
import { TankHeader } from "@/components/tank-header"

function MyTanks() {


  return (
    <div>
      <Navbar/>
      <TankHeader/>
      <TanksList/>
    </div>
  );
}

export default MyTanks;