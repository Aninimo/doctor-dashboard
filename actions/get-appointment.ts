import prismadb from '@/lib/prismadb';

export const getAppointment = async (appointmentId: string) => {
  try{
    const patient = await prismadb.appointment.findUnique({
      where: {
        id: appointmentId,
      }
    })
  
    return patient
  }catch (error) {
    console.log('[GET_PATIENT_ERROR]', error);
  }
}