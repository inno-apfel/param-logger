import { Navbar } from "@/components/nav-bar";
import { AccountSettings } from '@/pages/account/account-settings'
import { DeleteAccount } from '@/pages/account/delete-account'

const Account = () => {

  return (
    <>
      <Navbar
        authenticatedPage={true}
        fontColor = 'text-black'
        bgAlwaysSolid={true}
        scrollTransitionThreshold={0}
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
            to_url: '/chat'
          },
        ]}
      />
      <div className="h-17" />
      <div className="flex w-full h-screen justify-center">
        <div className="w-4xl mt-20">
            <AccountSettings />
            <DeleteAccount />
        </div>
      </div>
    </>
  );
};

export default Account;