import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { noteId: string } }
  ) {
    try {
      const { userId } = auth()
      const { content } = await req.json();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 })
      }
  
      if (!content) {
        return new NextResponse("Field is required", { status: 400 })
      }
  
      if (!params.noteId) {
        return new NextResponse("Note id is required", { status: 400 })
      }
  
      const note = await prismadb.note.updateMany({
        where: {
          id: params.noteId,
        },
        data: {
          content
        }
      })
  
      return NextResponse.json(note)
    } catch (error) {
      console.log('[NOTE_PATCH]', error)
      return new NextResponse("Internal Error", { status: 500 })
    }
  }
  

export async function DELETE(
    req: Request,
    { params }: { params: { noteId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.noteId) {
        return new NextResponse("Note id is required", { status: 400 });
      }
  
      const note = await prismadb.note.delete({
        where: {
          id: params.noteId,
        }
      });
    
      return NextResponse.json(note);
    } catch (error) {
      console.log('[NOTE_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };