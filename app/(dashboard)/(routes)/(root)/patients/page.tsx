import Link from 'next/link'
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server'
import { Plus } from 'lucide-react'

import { Buttons } from './conponents/buttons'
import prismadb from '@/lib/prismadb'

const PatientPage = async () => {
  const { userId } = auth()
  const patients = await prismadb.patient.findMany({
    where:{
      userId: userId as string
    }
  })
  return(
    <main className='p-4'>
      <div className='flex justify-between'>
      <h1 className='font-bold text-blue-500'>Patients</h1>
        <Link 
          href='/patients/new'
          className='flex gap-4 item-center text-blue-500'>
            <Plus/> add patient
        </Link>   
      </div>
      <table className='w-full border rounded text-center mt-8'>
      <thead className='border'>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Weight</th>
          <th>Age</th>
          <th>Disease</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id} className='border'>
            <td>{patient.name}</td>
            <th>{patient.gender}</th>
            <th>{patient.weight}</th>
            <th>{patient.age}</th>
            <td>{patient.disease}</td>
            <td className='flex items-center justify-center space-x-8'>
              <Buttons data={patient}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </main>
  )
}

export default PatientPage