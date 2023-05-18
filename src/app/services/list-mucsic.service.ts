import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListMucsic } from '../models/list-mucsic';
import { User } from '../models/user-music';

@Injectable({
  providedIn: 'root',
})
export class ListMucsicService {
  constructor(private http: HttpClient) {}

  getApi(): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>('https://apiuser-self.vercel.app/listMucsic');
  }
  getApi1(): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>('https://apiuser-self.vercel.app/listMucsic');
  }

  fetchapi(data: string): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>('https://apiuser-self.vercel.app/' + data);
  }
  fetchapiMS(data: string, id:number): Observable<any> {
    return this.http.get('https://apiuser-self.vercel.app/' + data + '/' + id);
  }
  fetchapi1(): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>('https://apiuser-self.vercel.app/tatca');
  }
  fetchapi1a(data : number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>('https://apiuser-self.vercel.app/tatca/' + data);
  }
  fetchapi11(data: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>('https://apiuser-self.vercel.app/tatca/'+ data );
  }

  playmusic(id: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>(`https://apiuser-self.vercel.app/listMucsic/${id}`);
  }
  playmusicvn(id: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>(`https://apiuser-self.vercel.app/vietnam/${id}`);
  }

  pushData(data: any): Observable <any> {
    return this.http.post('https://apiuser-self.vercel.app/user',data);
  }
  update(id: string,data: any): Observable<any> {
    console.log(id,data)
    return this.http.put('https://apiuser-self.vercel.app/user/' + id, data);
  }
  
  getData(): Observable <any> {
    return this.http.get('https://apiuser-self.vercel.app/user');
  }
  getData1(id: string): Observable <any> {
    return this.http.get<Array<User>>('https://apiuser-self.vercel.app/user/' + id);
  }
  getUser(data: any): Observable <any> {
    return this.http.get('https://apiuser-self.vercel.app/user/' + data);
  }

  checklogin(){
    return sessionStorage.getItem('username');
  }
  deleteuser(id : string): Observable <any>{
    return this.http.delete('https://apiuser-self.vercel.app/user/'+ id);
  }
}