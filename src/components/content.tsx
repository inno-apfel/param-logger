import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Content() {

  return (
    <Card className="grow-5 m-2 shadow-none">
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
  )
}

export { Content }

