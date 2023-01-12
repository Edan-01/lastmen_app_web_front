import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { const_uri } from '../constantes/const_uri';
import { ProveedorModel } from '../models/proveedor.model';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})

export class ProveedorService {

  url = const_uri.mant_proveedor;
  constructor(
    private _http: HttpClient,
    private _sesionservice: SesionService
  ) { }

  getAll(): Observable<ProveedorModel[]> {
    return this._http.get<ProveedorModel[]>(this.url);
  }

  create(proveedor: ProveedorModel): Observable<ProveedorModel> {
    return this._http.post<ProveedorModel>(this.url, proveedor);
  }

  update(proveedor: ProveedorModel): Observable<ProveedorModel> {
    return this._http.put<ProveedorModel>(this.url, proveedor)
  }

  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${id}`);
  }
  getById(id:number){
    return this._http.get<ProveedorModel[]>(`${this.url}${id}`);
  }


}