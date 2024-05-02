'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'

export type Props = {
  id: string
}

interface AppointmentProps{
  data: Props;
}

const Buttons = ({ data }: AppointmentProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onDelete = async (appointmentId: string) => {
    try{
      setLoading(true)
      const response = await fetch(`/api/appointments/${appointmentId}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      router.refresh()
    }catch (error) {
      alert(error)
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex gap-8'>
      <button onClick={() => router.push(`/appointments/${data.id}`)}>
        <Pencil/>
      </button>

      <button
        className='text-red-500'
        onClick={() => onDelete(data.id)}>
        <Trash2/>
      </button>
    </div>
  )
}

export { Buttons }
