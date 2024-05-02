import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server'

import { PatientForm  } from '../conponents/patient-form'
import { getPatient } from '@/actions/get-patient';

const PatientIdPage = async ({ 
    params 
}: {
  params: { patientId: string }
}) => {
    
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const patient = await getPatient(params.patientId)

  return(
    <main className='p-4'>
      <PatientForm initialData={patient}/>
    </main>
  )
}

export default PatientIdPage