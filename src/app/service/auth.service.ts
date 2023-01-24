import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/common/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlback = "http://lastpro-001-site1.btempurl.com/api/Auth";
  constructor(
    private http: HttpClient
  ) { }

  login(request: LoginRequestModel) {
    return this.http.post(this.urlback, request);
  }
}
