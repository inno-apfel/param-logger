import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Sidebar() {

  return (
    <div className="flex grow-1 flex-col">

        <Card className="m-2 shadow-none w-full">
            <CardHeader>
                <CardTitle>
                To Do
                </CardTitle>
                <hr className="-mx-6 mt-4 border-gray-100" />
            </CardHeader>
            <CardContent>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                </ul>
            </CardContent>
        </Card>

        <p className="p-2 m-2 shadow-none text-[#86878A]">
          <strong>Contact Us</strong><br></br>
          <br></br>
          ParamLogger<br></br>
          support@paramlogger.com<br></br><br></br>
          <img className="invert-40" src="/src/assets/qr_code.svg" alt="qrcode" width="190" />
        </p>
        

    </div>
  )
}

export { Sidebar }

