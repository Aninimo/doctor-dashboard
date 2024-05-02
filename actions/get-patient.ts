import prismadb from '@/lib/prismadb';

export const getPatient = async (patientId: string) => {
  try{
    const patient = await prismadb.patient.findUnique({
      where: {
        id: patientId,
      }
    })
  
    return patient
  }catch (error) {
    console.log('[GET_PATIENT_ERROR]', error);
  }
}