import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

import { Card } from '@/components/card'
import { Graph } from '@/components/graph'
import { InfoDoctor } from '@/components/infoDoctor';
import { getGraph } from '@/actions/get-graph'
import prismadb from '@/lib/prismadb'

export default async function Dashboard(){
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const graph = await getGraph(userId as string)

  const patients = await prismadb.patient.findMany({
    where:{
      userId: userId as string
    }
  })

  const appointments = await prismadb.appointment.findMany({
    where:{
      userId: userId as string
    }
  })

  const totalConsutation = patients.length + appointments.length

  return(
    <main className='flex flex-col lg:flex-row gap-16 pt-8 p-4 md:flex-col'>
      <div className='w-full lg:w-1/2'>
        <Card/>
        <div className='mt-8'>
          <h2 className='font-bold mb-4'>Patient Active</h2>
          <Graph data={graph}/>
        </div>
        <h2 className='font-bold mb-4 mt-8'>Patient Active</h2>
        <table className='w-full border rounded text-center mt-8'>
          <thead className='border'>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Disease</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr 
                key={patient.id}
                className='border'
              >
                <td>{patient.name}</td>
                <th>{patient.gender}</th>
                 <th>{patient.weight}</th>
                <td>{patient.disease}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      <InfoDoctor
        totalPatients={patients.length} 
        totalAppointments={appointments.length}
        totalConsutation={totalConsutation}
      />
      </div>
    </main>
  )
}