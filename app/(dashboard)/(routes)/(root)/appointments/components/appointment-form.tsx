'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Appointment, Patient } from '@prisma/client'

interface Props {
  initialData?: Appointment | null;
  patients: Patient[];
}

const formSchema = z.object({
  date: z.string().min(1),
  hour: z.string().min(1),
  patient: z.string().min(1)
})

type AppointmentFormValues = z.infer<typeof formSchema>

const AppointmentForm = ({ initialData, patients }: Props) => {
 const [loading, setLoading] = useState(false);
 const params = useParams()

 const form = useForm<AppointmentFormValues>({
   resolver: zodResolver(formSchema),
   defaultValues: initialData || {
     date: '',
     hour: '',
     patient: ''
   },
 });

 const onSubmit = async (data: AppointmentFormValues) => {
  try {
    const url = initialData
    ? `/api/appointments/${params.appointmentId}`
    : `/api/appointments`;

    const method = initialData ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

    if (!response.ok) {
      throw new Error('Failed to create patient');
    }

    const responseData = await response.json();
    const appointmentId = responseData.id;
    toast.success('Appointment created')
  } catch (error) {
    console.error('Failed to create appointment:', error);
    alert('Failed to create appointment. Please try again.');
  } finally {
    setLoading(false);
  }
 }

 const action = initialData ? 'Save changes': 'Create'

  return(
    <div className='p-4'>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-64 border border-blue-400 rounded p-4'>
        <div>
        <div className='flex flex-col'>
            <label>Date</label>
            <input
              type='date'
              disabled={loading}
              placeholder='Date'
              {...form.register('date')}
              className='w-44'
            />
          </div>

          <div className='flex flex-col mt-8'>
            <label>Hour</label>
            <input
              type='time'
              disabled={loading}
              placeholder='Hour'
              {...form.register('hour')}
              className='w-44'
            />
          </div>

          <div className='flex flex-col mt-8'>
            <label>Patients</label>
            <select {...form.register('patient')}>
              {patients?.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
             ))}
            </select>
          </div>
          <button 
            type='submit'
            disabled={loading}
            className='bg-blue-500 text-white rounded p-2 px-16 mt-8 hover:bg-blue-600'
          >
            {action}
          </button>    
        </div>
        <div>
          <Image
            src='/agenda.png'
            alt='user icon'
            width={250}
            height={250}
          />
        </div>
      </form>
      <ToastContainer/>
    </div>
  )
}

export { AppointmentForm }