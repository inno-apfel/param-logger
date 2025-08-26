import { Navbar } from "@/components/nav-bar"

import TanksList from './tanks-list'

function MyTanks() {

  return (
    <div>
      <Navbar
        authenticatedPage={true}
        fontColor = 'text-black'
        bgAlwaysSolid={false}
        bgAlwaysWhite={true}
        scrollTransitionThreshold={Infinity}
        navItems={[
          {
            label: 'Chat', 
            to_url: '/chat', 
          }
        ]}
      />
      <TanksList/>
    </div>
  );
}

export default MyTanks;