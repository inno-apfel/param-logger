import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Card, CardHeader } from '@/components/ui/card'

import CreateEntityDialog from '@/components/create-entity-dialog'

import api from '@/lib/api'
import { type Tank } from '@/types/prisma-models'
import errorLogger from '@/utils/errorLogger'

function TanksList() {

  const [tanks, setTanks] = useState<Tank[] | null>(null);

  useEffect(() => {
    fetchTanks()
  }, [])

  async function fetchTanks() {
    try {
      const res = await api.get('/tanks');
      setTanks(res.data);
    } 
    catch (error: any) {
      errorLogger(error, 'alert')
    } 
  };

  return (
      <div className="h-screen bg-white">
        <div className="h-18 bg-white"></div>
        <div className="flex justify-center m-2 ">
          <div className="flex flex-col w-7xl items-center gap-3">

            {tanks?.map(tank => (
              <Link to={`/dashboard/${tank.id}`} key={tank.id}>
                <Card key={tank.id} className="bg-neutral-200 rounded-lg w-4xl h-40 py-3">
                  <CardHeader className="w-4xl px-3">
                    <p className="bg-white rounded-md py-2 px-4 w-fit font-bold">
                      {tank.name}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}

            <CreateEntityDialog
              fields={[
                {name: 'tank_name', label: 'Name', defaultValue: 'My Tank'}
              ]}
              postUrl={`/tanks`}
              itemName={'Tank'}
              refreshData={fetchTanks}
            >
              <Card className="w-4xl h-40 py-0 bg-transparent border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-gray-600 font-medium">Add New Tank</span>
                <span className="text-gray-400 text-sm">Click to create</span>
              </Card>
            </CreateEntityDialog>

          </div>
        </div>
      </div>
  );
  
}

export default TanksList;