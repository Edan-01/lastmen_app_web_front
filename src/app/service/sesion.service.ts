import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }

  setVariableSesion(token: string, user: any) {
    localStorage.setItem("token",token);
    localStorage.setItem("user",JSON.stringify(user));
  }
  getvariableSesion(variable: string) {
    return localStorage.getItem(variable);
  }

  getUser(){
    let user=localStorage.getItem("user");
    if(user!=null){
      user = JSON.parse(user);
    }
    return user;
  }

}
