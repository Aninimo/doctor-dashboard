import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server'

import { AppointmentForm } from '../components/appointment-form'
import prismadb from '@/lib/prismadb';
import { getAppointment } from '@/actions/get-appointment'

const AppointmentIdPage = async ({
  params
}: {
  params: { appointmentId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }
  
  const data = await getAppointment(params.appointmentId)

  const patients = await prismadb.patient.findMany({
    where: {
      userId: userId as string
    },
  });

  return(
    <>
     <AppointmentForm 
        initialData={data}
        patients={patients}/>
    </>
  )
}

export default AppointmentIdPage