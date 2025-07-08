import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ParamChart } from "@/components/param-chart"

function Content() {

  const nums =  Array.from({ length: 6 }, (_, x) => x);

  return (
    <div className="grid grid-cols-2 grow-5">

      <Card className="col-span-2 m-2 shadow-none">
        <CardHeader>
          <CardTitle>
              Stuff
          </CardTitle>
          <hr className="-mx-6 mt-4  border-gray-100" />
        </CardHeader>
        <CardContent>
            Lorem Ipsum
        </CardContent>
      </Card>

      {nums.map(() => (
        <ParamChart/>
      ))}
    
    </div>
  )
}

export { Content }

