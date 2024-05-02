import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { appointmentId: string } }
  ) {
    try {
      const { userId } = auth()
      const { date, hour, patient } = await req.json();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 })
      }
  
      if (!date && !hour && !patient) {
        return new NextResponse("Field is required", { status: 400 })
      }
  
      if (!params.appointmentId) {
        return new NextResponse("Appointment id is required", { status: 400 })
      }
  
      const appointment = await prismadb.appointment.updateMany({
        where: {
          id: params.appointmentId 
        },
        data: {
          date,
          hour,
          patientId: patient,
        },
      })
  
      return NextResponse.json(appointment)
    } catch (error) {
      console.log('[APPOINTMENT_PATCH]', error)
      return new NextResponse("Internal Error", { status: 500 })
    }
  }
  

export async function DELETE(
    req: Request,
    { params }: { params: { appointmentId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.appointmentId) {
        return new NextResponse("Appointment id is required", { status: 400 });
      }
  
      const note = await prismadb.appointment.delete({
        where: {
          id: params.appointmentId,
        }
      });
    
      return NextResponse.json(note);
    } catch (error) {
      console.log('[PATIENT_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };