import TanksList from '@/components/tanks-list'
import { Navbar } from "@/components/nav-bar"

function MyTanks() {

  return (
    <div>
      <Navbar
        authenticatedPage={true}
        fontColor = 'black'
        bgAlwaysSolid={false}
        scrollTransitionThreshold={Infinity}
      />
      <TanksList/>
    </div>
  );
}

export default MyTanks;