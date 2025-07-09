import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ParamChart } from "@/components/param-chart"

import axios from 'axios'

import { useState, useEffect, type JSX } from 'react'

function Content() {

  const nums =  Array.from({ length: 6 }, (_, x) => x);

  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    // console.log(response.data.params);
    setArray(response.data.params);
    console.log(array);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

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
            {array.map((fruit: string): JSX.Element => (
              <p>{fruit}</p>
            )) }
        </CardContent>
      </Card>

      {nums.map(() => (
        <ParamChart/>
      ))}
    
    </div>
  )
}

export { Content }

