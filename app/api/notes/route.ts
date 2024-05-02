import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!title) {
      return new NextResponse('Required', { status: 401 });
    }

    const note = await prismadb.note.create({
      data:{
        title,
        userId
      }
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error(`[PATIENT_POST]: ${error}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 