import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server'

import { Editor } from '../components/editor'
import prismadb from '@/lib/prismadb';

const NoteIdPage = async ({
  params
}: {
  params: { noteId: string }
}) => {

  const note = await prismadb.note.findUnique({
    where: {
      id: params.noteId
    }
  })

  return(
    <main className='p-4'>
      <h1 className='text-blue-500 font-bold text-2xl'>
        Title: {note?.title}
      </h1>
      <Editor noteId={note?.id} initialContent={note?.content}/>
    </main>
  )
}

export default NoteIdPage