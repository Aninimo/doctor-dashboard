import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { name, gender, weight, age, disease } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const patient = await prismadb.patient.create({
      data:{
        name,
        gender,
        weight,
        age,
        disease,
        userId
      }
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.error(`[PATIENT_POST]: ${error}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 