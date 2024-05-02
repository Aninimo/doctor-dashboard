import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { date, hour, patient } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!date && !hour && !patient) {
      return new NextResponse('Field is required', { status: 401 });
    }
  
    const appointment = await prismadb.appointment.create({
      data:{
        date,
        hour,
        patient: {
          connect: {
            id: patient,
           },
        },
        userId
      }
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error(`[PATIENT_POST]: ${error}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 