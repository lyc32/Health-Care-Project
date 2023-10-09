import {Injectable} from "@angular/core";
import {Appointment} from "../model/appointment";
import {Observable} from "rxjs";
import {Message} from "../model/message";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MessageService
{
    private baseURL = "http://localhost:8080/api/v1/message";
    constructor(private httpClient:HttpClient)
    { }

    getMyReceiveMessage(id:number):Observable<Message[]>
    {
        return this.httpClient.get<any>(this.baseURL + "/receive/" + id);
    }

    getMySendMessage(id:number):Observable<Message[]>
    {
        return this.httpClient.get<any>(this.baseURL + "/send/" + id);
    }

    getMyUnreadMessage(id:number):Observable<string>
    {
        return this.httpClient.post<any>(this.baseURL + "/unread/" + id , {responseType: 'text'});
    }

    createMessage(id1:number, id2:number, message : Message):Observable<Message>
    {
        return this.httpClient.post<any>(this.baseURL + "/add/" + id1 + "/to/" + id2, message);
    }

    deleteSendMessage(id:number, m_id:string):Observable<Message[]>
    {
        return this.httpClient.get<any>(this.baseURL + "/delete/" + id + "/send/" + m_id);
    }

    deleteReceiveMessage(id:number, m_id:string):Observable<Message[]>
    {
        return this.httpClient.get<any>(this.baseURL + "/delete/" + id + "/receive/" + m_id);
    }


}
