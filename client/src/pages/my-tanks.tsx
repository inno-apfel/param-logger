import TanksList from '../components/tanks-list'
import { Navbar } from "@/components/nav-bar"

function MyTanks() {


  return (
    <div>
      <Navbar variant='tanks-list'/>
      <TanksList/>
    </div>
  );
}

export default MyTanks;