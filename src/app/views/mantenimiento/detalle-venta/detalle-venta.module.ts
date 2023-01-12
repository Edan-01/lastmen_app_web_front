import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DetalleVentaRoutingModule } from './detalle-venta-routing.module';
import { detalleVentaListComponent } from './detalle-venta-list/detalle-venta-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    detalleVentaListComponent 
  ],
  imports: [
    CommonModule,
    DetalleVentaRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class DetalleVentaModule { }
