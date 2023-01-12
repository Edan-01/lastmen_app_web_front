import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { const_uri } from '../constantes/const_uri';
import { ProductoModel } from '../models/producto.model';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = const_uri.mant_producto;
  constructor(
    private _http: HttpClient,
    private _sesionservice: SesionService
  ) { }

  getAll(): Observable<ProductoModel[]> {
    return this._http.get<ProductoModel[]>(this.url);
  }

  create(producto: ProductoModel): Observable<ProductoModel> {
    return this._http.post<ProductoModel>(this.url, producto);
  }

  update(producto: ProductoModel): Observable<ProductoModel> {
    return this._http.put<ProductoModel>(this.url, producto)
  }

  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${id}`);
  }

}