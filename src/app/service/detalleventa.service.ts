import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { const_uri } from '../constantes/const_uri';
import { DetalleVentaModel } from '../models/detalleVentas.model';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})

export class detalleventaService {

  url = const_uri.mant_detalleventas;
  constructor(
    private _http: HttpClient,
    private _sesionservice: SesionService
  ) { }

  getAll(): Observable<DetalleVentaModel[]> {
    return this._http.get<DetalleVentaModel[]>(this.url);
  }

  create(detalleventa: DetalleVentaModel): Observable<DetalleVentaModel> {
    return this._http.post<DetalleVentaModel>(this.url, detalleventa);
  }

  update(detalleventa: DetalleVentaModel): Observable<DetalleVentaModel> {
    return this._http.put<DetalleVentaModel>(this.url, detalleventa)
  }

  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${id}`);
  }
}
