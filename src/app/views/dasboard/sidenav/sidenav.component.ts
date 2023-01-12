import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  usuario: any = {};
  constructor( 
    private _sesionSevice: SesionService,
    private _router: Router) { }

  ngOnInit(): void {
    this.obetenerUsuario();
  }
  obetenerUsuario() {
    this.usuario = this._sesionSevice.getUser();
  }
  
}
