'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'

const Modal = () => {
  const [createTitle, setCreateTitle] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');

  const router = useRouter()
  
  const handleCreate = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: noteTitle }),
      });
      const responseData = await response.json()
      
      const newNoteId = responseData.id;

      router.push(`/notes/${newNoteId}`);
    } catch (error) {
      alert(error);
    }
  }

  const handleClose = () => {
    setCreateTitle(false);
  }
  return(
    <div>
      <button
         onClick={() => setCreateTitle((cur) => !cur)}
         className='flex gap-4 text-blue-400'
        >
          Add note
          <Plus />
      </button>
      {createTitle ? (
        <div >
          <div className='w-64 flex flex-col bg-blue-300 p-8 rounded mt-4'>
            <button
              className='ml-44 mb-4' 
              onClick={handleClose}>
              <X />
            </button>
              <input
                placeholder='Enter title'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className='mt-4 p-2 rounded'
              />
              <button 
                onClick={handleCreate}
                className='bg-blue-500 text-white rounded mt-4 p-2'>
                Add
              </button>
            
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { Modal }