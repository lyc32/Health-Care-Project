export class Appointment
{
  id: number;
  doctorId: number;
  doctor_name: string;
  personId: number;
  person_name: string;
  fee: number;
  details:string;
  date:string
  time:number

  constructor()
  {
    this.id = -1;
    this.doctorId = -1;
    this.doctor_name = '';
    this.personId = -1;
    this.person_name = '';
    this.fee = -1;
    this.details = '';
    this.date = '';
    this.time = -1;
  }
}
