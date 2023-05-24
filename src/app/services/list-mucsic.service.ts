import { HttpClient , HttpHeaders} from '@angular/common/http';
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
    console.log(data);
    return this.http.post('https://odd-gold-bighorn-sheep-boot.cyclic.app/users',data);
  }
  

  

  updatalink(id: string,data: any): Observable<any> {
    return this.http.put('https://odd-gold-bighorn-sheep-boot.cyclic.app/users/' + id, data);
  }
  update(id:any,data: any): Observable<any> {
    return this.http.put('https://odd-gold-bighorn-sheep-boot.cyclic.app/users/' + id, data);
  }
  
  getData(): Observable <any> {
    return this.http.get('https://odd-gold-bighorn-sheep-boot.cyclic.app/users/');
  }
 
  getData1(id : any): Observable <any> {
    return this.http.get<Array<User>>('https://odd-gold-bighorn-sheep-boot.cyclic.app/users/' + id);
  }
  getUser(data: any): Observable <any> {
    return this.http.get('https://odd-gold-bighorn-sheep-boot.cyclic.app/users/' + data);
  }

  checklogin(){
    return localStorage.getItem('username');
  }
  deleteuser(id : any): Observable <any>{
    return this.http.delete('https://odd-gold-bighorn-sheep-boot.cyclic.app/users/'+ id);
  }

  sendmessage(message : string) {
    return this.http.post('https://apichatbox.onrender.com/message', {prompt: message});
  }
}