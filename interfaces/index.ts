export interface PatientProps{
  id: string;
  name: string;
  gender: string;
  weight: string;
  age: string;
  disease: string;
}

export interface NoteProps{
  id: string;
  title: string;
  content?: string;
}