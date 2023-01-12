import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { const_uri } from '../constantes/const_uri';
import { CategoriaModel } from '../models/categoria.model';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  url = const_uri.mant_categoria;
  constructor(
    private _http: HttpClient,
    private _sesionservice: SesionService
  ) { }

  getAll(): Observable<CategoriaModel[]> {
    return this._http.get<CategoriaModel[]>(this.url);
  }

  create(categoria: CategoriaModel): Observable<CategoriaModel> {
    return this._http.post<CategoriaModel>(this.url, categoria);
  }

  update(categoria: CategoriaModel): Observable<CategoriaModel> {
    return this._http.put<CategoriaModel>(this.url, categoria)
  }

  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${id}`);
  }
}
