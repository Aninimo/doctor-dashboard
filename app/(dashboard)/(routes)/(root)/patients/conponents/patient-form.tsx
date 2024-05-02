'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Patient } from '@prisma/client'

interface Props {
  initialData?: Patient | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  gender: z.string().min(1),
  weight: z.string().min(1),
  age: z.string().min(1),
  disease: z.string().min(1)
});

type PatientFormValues = z.infer<typeof formSchema>

export const PatientForm = ({
  initialData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const params = useParams()

  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      gender: '',
      weight: '',
      age: '',
      disease: ''
    },
  });

  const onSubmit = async (data: PatientFormValues) => {
    try {
      const url = initialData
      ? `/api/patients/${params.patientId}`
      : `/api/patients`;

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
      const patientId = responseData.id;
      toast.success('Patient created')
    } catch (error) {
      console.error('Failed to create patient:', error);
      alert('Failed to create patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-72 border border-blue-400 rounded p-4'>
        <div className='flex flex-col'>
          <input
            type='text'
            disabled={loading}
            placeholder='Name'
            {...form.register('name')}
            className='w-56 border p-2 rounded mb-4'
          />
          <input
            type='text'
            disabled={loading}
            placeholder='Gender'
            {...form.register('gender')}
            className='w-56 border p-2 rounded mb-4'
          />

          <input
            type='text'
            disabled={loading}
            placeholder='Weight'
            {...form.register('weight')}
            className='w-56 border p-2 rounded mb-4'
          />

          <input
            type='text'
            disabled={loading}
            placeholder='Age'
            {...form.register('age')}
            className='w-56 border p-2 rounded mb-4'
          />

          <input
            type='text'
            disabled={loading}
            placeholder='Disease'
            {...form.register('disease')}
            className='w-56 border p-2 rounded mb-4'
          />

          <button
            type='submit'
            disabled={loading}
            className='w-56 bg-blue-500 text-white rounded p-2 px-16 mt-8 hover:bg-blue-600'
          >
            {action}
          </button>
          <ToastContainer />
        </div>
        <div className='mt-16'>
          <Image
            src='/patient.png'
            alt='user icon'
            width={250}
            height={250}/>
        </div>
      </form>
    </div>
  );
};
