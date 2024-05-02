import Link from 'next/link'
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'

import { Buttons } from './components/buttons'
import prismadb from '@/lib/prismadb'

const AppointmentPage = async () => {
 const { userId } = auth();

 if (!userId) {
   return redirect('/');
 } 

 const appointments = await prismadb.appointment.findMany({
   where: {
     userId: userId as string,
   },
    include: {
      patient: true, 
    },
  })

  return(
    <main className='p-4'>
      <div className='flex justify-between'>
      <h1 className='font-bold text-blue-400'>Appointments</h1>
        <Link href='/appointments/new' className='flex gap-4 text-blue-400'>
          Add appointment <Plus />
        </Link>
      </div>
      <table className='w-full border rounded text-center mt-8'>
      <thead className='border'>
        <tr>
          <th>Patient</th>
          <th>Date</th>
          <th>Hour</th>
          <th>Edit</th>
        </tr>
       </thead>
       <tbody>
          {appointments.map((appointment) => (
            <tr 
              key={appointment.id}
              className='border'
            >
              <td>{appointment.patient.name}</td>
              <td>{format(new Date(appointment.date),'dd/MM/yyyy')}</td>
              <td>{appointment.hour}</td>
              <td className='flex items-center justify-center space-x-8'>
                <Buttons data={appointment}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default AppointmentPage