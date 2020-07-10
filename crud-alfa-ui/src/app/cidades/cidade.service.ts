import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseCidades, RequestCreateCidade, Cidade } from './cidade.model';
import { HttpClient } from '@angular/common/http';
import { configAPI } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private url = configAPI.urlAPI + 'cidades';

  constructor(private htttp: HttpClient) { }

  getCidades(): Observable<ResponseCidades> {
    return this.htttp.get<ResponseCidades>(this.url);
  }

  createCidade(request: RequestCreateCidade): Observable<Cidade> {
    return this.htttp.post<Cidade>(this.url, request);
  }

  getCidade(_id: string): Observable<Cidade> {
    return this.htttp.get<Cidade>(`${this.url}/${_id}`);
  }

  updateCidade(_id: string, request: any): Observable<Cidade> {
    return this.htttp.put<Cidade>(`${this.url}/${_id}`, request);
  }

  deleteCidade(_id: string): Observable<any> {
    return this.htttp.delete<any>(`${this.url}/${_id}`);
  }

}
