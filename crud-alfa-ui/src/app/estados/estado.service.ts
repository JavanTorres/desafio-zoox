import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseEstados, RequestCreateEstado, Estado } from './estado.model';
import { HttpClient } from '@angular/common/http';
import { configAPI } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private url = configAPI.urlAPI + 'estados';

  constructor(private htttp: HttpClient) { }

  getEstados(): Observable<ResponseEstados> {
    return this.htttp.get<ResponseEstados>(this.url);
  }

  createUser(request: RequestCreateEstado): Observable<Estado> {
    return this.htttp.post<Estado>(this.url, request);
  }

  getEstado(_id: string): Observable<Estado> {
    return this.htttp.get<Estado>(`${this.url}/${_id}`);
  }

  updateEstado(_id: string, request: any): Observable<Estado> {
    return this.htttp.put<Estado>(`${this.url}/${_id}`, request);
  }

  deleteEstado(_id: string): Observable<any> {
    return this.htttp.delete<any>(`${this.url}/${_id}`);
  }

}
