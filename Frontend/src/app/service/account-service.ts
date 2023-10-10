import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import { Account } from "../model/account";
import {Appointment} from "../model/appointment";


@Injectable({
  providedIn: 'root'
})
export class AccountService
{

  private baseURL = "http://localhost:8080/api/v1/accounts";

  constructor(private httpClient:HttpClient)
  { }

  login(email:string, password:string):Observable<Account>
  {
    const info = {
      email: email,
      password: password
    }
    const params = new HttpParams({
      fromObject: info
    });
    return this.httpClient.post<Account>(this.baseURL +'/login', params);
  }

  signPerson(account:Account):Observable<Account>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      photo: account.photo,
      firstName: account.firstName,
      lastName: account.lastName,
      phone: account.phone,
      emailId: account.emailId,
      password: account.password,
      details: btoa(JSON.stringify(new Array())),
      type: "PERSON"
    }
    // @ts-ignore
    return this.httpClient.post<string>(this.baseURL, JSON.stringify(info), {headers: httpHeaders});
  }

  updatePhoto(id:number, photo:string, gender:string, birthday: string):Observable<Account>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      id: id,
      photo: photo,
      gender:gender,
      birthday:birthday
    }
    return this.httpClient.put<Account>(this.baseURL + "/" + id, JSON.stringify(info), {headers: httpHeaders });
  }


  updatePhone(id:number, phone:string):Observable<Account>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      id: id,
      phone: phone
    }
    return this.httpClient.put<Account>(this.baseURL + "/" + id, JSON.stringify(info), {headers: httpHeaders });
  }

  updateEmail(id:number, email:string):Observable<Account>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      id: id,
      emailId: email
    }
    return this.httpClient.put<Account>(this.baseURL + "/" + id, JSON.stringify(info), {headers: httpHeaders });
  }

  resetPassword(id:number, password:string):Observable<Account>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      id: id,
      password: password
    }
    return this.httpClient.put<Account>( this.baseURL + "/" + id, JSON.stringify(info), {headers: httpHeaders });
  }

  updateDetails(id:number, details:string):Observable<Account>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      id: id,
      details: details
    }
    return this.httpClient.put<Account>( this.baseURL + "/" + id, JSON.stringify(info), {headers: httpHeaders });
  }
  getDoctors():Observable<Account[]>
  {
    return this.httpClient.get<Account[]>(`${this.baseURL}` + '/doctors');
  }

  getDoctorsBySubtype(subtype: string):Observable<Account[]>
  {
    const info = {
      subtype: subtype
    }
    const params = new HttpParams({
      fromObject: info
    });
    return this.httpClient.post<Account[]>(`${this.baseURL}` + '/doctors/type', params);
  }

  getAccountById(id : number):Observable<Account>
  {
    return this.httpClient.get<Account>(`${this.baseURL}` + "/" + id);
  }


  deleteAccountById(id:number):Observable<Object>
  {
    return this.httpClient.delete(`${this.baseURL}` + "/" + id, {responseType: 'text'});
  }

  search(id:number, firstName:string, lastName:string, emailId:string, phone:string, birthday:string, gender:string):Observable<Account []>
  {
    const info = {
      id:id,
      firstName: firstName,
      lastName: lastName,
      emailId:emailId,
      phone:phone,
      birthday:birthday,
      gender:gender,
      type: 'PERSON'
    }
    const params = new HttpParams({
      fromObject: info
    });
    return this.httpClient.post<Account[]>(this.baseURL + '/search', params);
  }



}
