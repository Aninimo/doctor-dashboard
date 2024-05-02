'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MenuBar } from './menu-bar'

interface EditorProps {
  noteId?: string;
  initialContent?: string | null;
}

const Editor = ({ noteId, initialContent }: EditorProps) => {
  const [editorContent, setEditorContent] = useState(initialContent || '')
  const[loading,setLoading] = useState(false)

  const router = useRouter()
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    autofocus: false,
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML())
    },
  })
  
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId, content: editorContent }),
      })
      toast.success('Note saved')
    } catch (error) {
      alert(error)
    }
  };

  const onDelete = async () => {
  try {
    setLoading(true);
    const response = await fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/notes');
  } catch (error) {
    alert(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <div className='mt-8'>
        <MenuBar
          editor={editor}
        />
        <EditorContent 
          editor={editor} 
          className='p-4 border'/>
        <div className='flex justify-between'>
           <button 
             onClick={handleSave}
             className='bg-blue-500 text-white rounded p-2 px-12 mt-8'>
            Save
          </button>
          <button
            onClick={onDelete}
            className='bg-red-500 text-white rounded p-2 px-12 mt-8'>
            Delete
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export { Editor }