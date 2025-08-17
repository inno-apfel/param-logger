import { Navbar } from "@/components/nav-bar";
import { Textarea } from "@/components/ui/textarea"

const Chat = () => {
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
        ]}
      />
      <div className="h-17"></div>
      <div className="flex w-full h-screen justify-center items-center ">
        <div className="flex flex-col items-center mb-80">
          <h1 className="text-center text-2xl">
            How can I help today?
          </h1>
          <Textarea 
            className="w-2xl mt-10" 
            placeholder="Ask anything" 
          />
        </div>
      </div>
    </>
  );
};

export default Chat;