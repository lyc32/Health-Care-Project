import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import { Appointment } from "../model/appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService
{
  private baseURL = "http://localhost:8080/api/v1/appointments";

  constructor(private httpClient:HttpClient)
  { }

  createAppointment(appointment : Appointment):Observable<Appointment>
  {
    return this.httpClient.post<any>(`${this.baseURL}`, appointment);
  }

  getAllAppointments():Observable<Appointment[]>
  {
    return this.httpClient.get<Appointment[]>(`${this.baseURL}`);
  }
  getAllAppointmentsByDate(date : string):Observable<Appointment[]>
  {
    return this.httpClient.get<Appointment[]>(`${this.baseURL}/date/${date}`);
  }
  getAppointmentsById(id : number):Observable<Appointment>
  {
    return this.httpClient.get<Appointment>(`${this.baseURL}/appointment/${id}`);
  }
  updateAppointment(id : number, appointment : Appointment): Observable<Appointment>
  {
    return this.httpClient.put<Appointment>(`${this.baseURL}/${id}`, appointment);
  }

  deleteAppointment(id : number) : Observable<Object>
  {
    return this.httpClient.delete(`${this.baseURL}/${id}`, {responseType: 'text'});
  }

  getAppointmentsByDoctorIDAndDate(doctor_id:number,date:number):Observable<Appointment []>
  {
    return this.httpClient.get<Appointment[]>(this.baseURL + '/doctor/date/' + doctor_id + "/" + date);
  }

  getAppointmentByPersonId(person_id:number)
  {
    return this.httpClient.get<Appointment[]>(this.baseURL + '/person/' + person_id);
  }

  search(doctorId:number,doctorName:string, personName:string, date:string, time:number, fee:number):Observable<Appointment []>
  {
    const info = {
      doctorId:doctorId,
      doctorName: doctorName,
      personName: personName,
      date:date,
      time:time,
      fee:fee
    }
    const params = new HttpParams({
      fromObject: info
    });
    return this.httpClient.post<Appointment[]>(this.baseURL + '/search', params);
  }

}
