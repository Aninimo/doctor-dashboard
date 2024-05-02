import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { patientId: string } }
  ) {
    try {
      const { userId } = auth()
      const { name, gender, weight, age, disease } = await req.json();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 })
      }
  
      if (!name && !gender && !weight && !age && !disease) {
        return new NextResponse("Field is required", { status: 400 })
      }
  
      if (!params.patientId) {
        return new NextResponse("Note id is required", { status: 400 })
      }
  
      const patient = await prismadb.patient.updateMany({
        where: {
          id: params.patientId,
        },
        data: {
          name,
          gender,
          weight,
          age,
          disease
        }
      })
  
      return NextResponse.json(patient)
    } catch (error) {
      console.log('[PATIENT_PATCH]', error)
      return new NextResponse("Internal Error", { status: 500 })
    }
  }
  

export async function DELETE(
    req: Request,
    { params }: { params: { patientId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.patientId) {
        return new NextResponse("Patient id is required", { status: 400 });
      }
  
      const note = await prismadb.patient.delete({
        where: {
          id: params.patientId,
        }
      });
    
      return NextResponse.json(note);
    } catch (error) {
      console.log('[PATIENT_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };