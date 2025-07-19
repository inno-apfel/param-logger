import api from '../lib/api'
import { useState, useEffect } from 'react'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Tank } from '../types/prisma-models'
import { Link } from 'react-router-dom'

function TanksList() {

  const [tanks, setTanks] = useState<Tank[] | null>(null);

  const fetchTanks = async () => {
    try {
      const res = await api.get(
        '/tanks'
    );
      setTanks(res.data);
    } catch {
      setTanks(null);
    } 
  };

  useEffect(() => {
    fetchTanks()
  })

  const handleCreateNew = async () => {
    await api.post('/tanks', {tank_name: "Tank TWO"})
  }

  return (
      <div className="h-screen bg-white">
        <div className="h-18 bg-white">
        </div>

        <div className="flex justify-center m-2 ">
          <div className="flex flex-col w-7xl items-center gap-3">

            {tanks?.map(tank => (
              <Link to={`/dashboard/${tank.id}`}>
                <Card key={tank.id} className="bg-blue-400 w-4xl h-40 py-3">
                  <CardHeader className="w-4xl px-3">
                    <p className="bg-white rounded-lg py-2 px-4 w-fit font-bold">
                      {tank.name}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
              
            ))}

            <Button onClick={handleCreateNew}>
              Create New Tank +
            </Button>

          </div>
        </div>

        

        



      </div>
  );
  
}

export default TanksList;