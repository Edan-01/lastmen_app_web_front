import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/common/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlback = "https://localhost:7047/api/auth/";
  constructor(
    private http: HttpClient
  ) { }

  login(request: LoginRequestModel) {
    return this.http.post(this.urlback, request);
  }
}
