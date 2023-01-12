import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VentasRoutingModule } from './ventas-routing.module';
import { VentasListComponent } from './ventas-list/ventas-list.component';
import { VentasRegisterComponent } from './ventas-register/ventas-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { VentasComprobanteComponent } from './ventas-comprobante/ventas-comprobante.component';



@NgModule({
  declarations: [
    VentasListComponent,
    VentasRegisterComponent,
    VentasComprobanteComponent,
    
    
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class VentasModule { }
