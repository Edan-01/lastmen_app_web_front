import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { const_uri } from '../constantes/const_uri';
import { VentasModel } from '../models/ventas.model';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  url = const_uri.mant_ventas;
  constructor(
    private _http: HttpClient,
    private _sesionservice: SesionService
  ) { }

  getAll(): Observable<VentasModel[]> {
    return this._http.get<VentasModel[]>(this.url);
  }

  create(ventas: VentasModel): Observable<VentasModel> {
    return this._http.post<VentasModel>(this.url, ventas);
  }

  update(ventas: VentasModel): Observable<VentasModel> {
    return this._http.put<VentasModel>(this.url, ventas)
  }


  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${id}`);
  }


}