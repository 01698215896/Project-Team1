import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ListMucsic } from '../models/list-mucsic';
import { User } from '../models/user-music';
import { Socket, SocketOptions, io } from 'socket.io-client';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class ListMucsicService {
  socket: Socket = io('https://apichatrealtime.onrender.com');
  messageSubject: Subject<any> = new Subject<any>();
  message: string = '';

  constructor(private http: HttpClient) {
    this.setupSocketConnection();
  }
  emitmsg(data: any) {
    this.socket.emit('my message', data);
  }

  onmsg(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  setupSocketConnection() {
    this.socket = io('https://apichatrealtime.onrender.com');
    this.socket.on('my broadcast', (data) => {
      console.log(data);
      if (data !== this.message) {
        this.messageSubject.next(data);
      }
    });
  }



  getApi(): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>(
      'https://apiuser-self.vercel.app/listMucsic'
    );
  }
  getApi1(): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>(
      'https://apiuser-self.vercel.app/listMucsic'
    );
  }
  getApi11(): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>(
      'https://apiuser-self.vercel.app/listMucsic1'
    );
  }

  fetchapi(data: string): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>(
      'https://apiuser-self.vercel.app/' + data
    );
  }
  fetchapi111(data: string): Observable<any>{
    return this.http.get<any>(
      'https://apiuser-self.vercel.app/' + data
    );
  }
  fetchapiMS(data: string, id: number): Observable<any> {
    return this.http.get('https://apiuser-self.vercel.app/' + data + '/' + id);
  }
  fetchapi1(): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>(
      'https://apiuser-self.vercel.app/tatca'
    );
  }
  fetchapi1a(data: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>(
      'https://apiuser-self.vercel.app/tatca/' + data
    );
  }
  fetchapi11(data: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>(
      'https://apiuser-self.vercel.app/tatca/' + data
    );
  }

  playmusic(id: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>(
      `https://apiuser-self.vercel.app/listMucsic/${id}`
    );
  }
  playmusic1(linkApi: string, id: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>(
      `https://apiuser-self.vercel.app/${linkApi}/${id}`
    );
  }
  playmusicvn(id: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>(
      `https://apiuser-self.vercel.app/vietnam/${id}`
    );
  }

  pushData(data: any): Observable<any> {
    console.log(data);
    return this.http.post(
      'https://odd-gold-bighorn-sheep-boot.cyclic.app/users',
      data
    );
  }

  updatalink(id: string, data: any): Observable<any> {
    return this.http.put(
      'https://odd-gold-bighorn-sheep-boot.cyclic.app/users/' + id,
      data
    );
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(
      'https://odd-gold-bighorn-sheep-boot.cyclic.app/users/' + id,
      data
    );
  }

  getData(): Observable<any> {
    return this.http.get(
      'https://odd-gold-bighorn-sheep-boot.cyclic.app/users/'
    );
  }

  getData1(id: any): Observable<any> {
    return this.http.get<Array<User>>(
      'https://odd-gold-bighorn-sheep-boot.cyclic.app/users/' + id
    );
  }
  getUser(data: any): Observable<any> {
    return this.http.get(
      'https://odd-gold-bighorn-sheep-boot.cyclic.app/users/' + data
    );
  }

  checklogin() {
    return localStorage.getItem('username');
  }

  deleteuser(id: any): Observable<any> {
    return this.http.delete(
      'https://odd-gold-bighorn-sheep-boot.cyclic.app/users/' + id
    );
  }

  sendmessage(message: string) {
    return this.http.post('https://apichatbox.onrender.com/message', {
      prompt: message,
    });
  }
}


