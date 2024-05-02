import Link from 'next/link'
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server'

import { Modal } from './components/modal'
import prismadb from '@/lib/prismadb'

const NotePage = async () => {
 const { userId } = auth();

 if (!userId) {
    return redirect('/');
 }
  
 const notes = await prismadb.note.findMany({
    where: {
      userId: userId as string,
    },
  })

  return(
    <main className='p-4'>
      <div className='flex justify-between'>
      <h1 className='font-bold text-2xl text-blue-400 mb-4'>Your notes</h1>
        <Modal/>
      </div>
      <div>
        {notes.map((note) => (
           <Link 
             href={`/notes/${note.id}`}
             key={note.id}
             className='flex gap-2 text-2xl mt-4 mb-8'>
            <span className='text-blue-400'>●</span> {note.title}
          </Link>
        ))}
      </div>
    </main>
  )
}

export default NotePage