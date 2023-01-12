import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { const_uri } from '../constantes/const_uri';
import { UsuarioModel } from '../models/usuario.model';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  url = const_uri.mant_usuario;
  constructor(
    private _http: HttpClient,
    private _sesionservice: SesionService
  ) { }

  getAll(): Observable<UsuarioModel[]> {
    return this._http.get<UsuarioModel[]>(this.url);
  }
  getById(id:number){
    return this._http.get<UsuarioModel[]>(`${this.url}${id}`);
  }

  create(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this._http.post<UsuarioModel>(this.url, usuario);
  }

  update(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this._http.put<UsuarioModel>(this.url, usuario)
  }

  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${id}`);
  }
}
