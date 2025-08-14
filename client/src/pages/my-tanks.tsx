import TanksList from '@/components/tanks-list'
import { Navbar } from "@/components/nav-bar"

function MyTanks() {

  return (
    <div>
      <Navbar
        authenticatedPage={true}
        fontColor = 'text-black'
        bgAlwaysSolid={false}
        bgAlwaysWhite={true}
        scrollTransitionThreshold={Infinity}
      />
      <TanksList/>
    </div>
  );
}

export default MyTanks;