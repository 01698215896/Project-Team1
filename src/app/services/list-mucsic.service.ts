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
    return this.http.get<Array<ListMucsic>>('http://localhost:3000/listMucsic');
  }
  getApi1(): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>('http://localhost:3000/listMucsic1');
  }

  fetchapi(data: string): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>('http://localhost:3000/' + data);
  }
  fetchapiMS(data: string, id:number): Observable<any> {
    return this.http.get('http://localhost:3000/' + data + '/' + id);
  }
  fetchapi1(): Observable<Array<ListMucsic>> {
    return this.http.get<Array<ListMucsic>>('http://localhost:3000/tatca');
  }
  fetchapi1a(data : number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>('http://localhost:3000/tatca/' + data);
  }
  fetchapi11(data: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>('http://localhost:3000/tatca/'+ data );
  }

  playmusic(id: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>(`http://localhost:3000/listMucsic/${id}`);
  }
  playmusicvn(id: number): Observable<ListMucsic> {
    return this.http.get<ListMucsic>(`http://localhost:3000/vietnam/${id}`);
  }

  pushData(data: any): Observable <any> {
    return this.http.post('http://localhost:3000/user',data);
  }
  update(id: string,data: any): Observable<any> {
    console.log(id,data)
    return this.http.put('http://localhost:3000/user/' + id, data);
  }
  
  getData(): Observable <any> {
    return this.http.get('http://localhost:3000/user');
  }
  getData1(id: string): Observable <any> {
    return this.http.get<Array<User>>('http://localhost:3000/user/' + id);
  }
  getUser(data: any): Observable <any> {
    return this.http.get('http://localhost:3000/user/' + data);
  }

  checklogin(){
    return sessionStorage.getItem('username');
  }
  deleteuser(id : string): Observable <any>{
    return this.http.delete('http://localhost:3000/user/'+ id);
  }
}