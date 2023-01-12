import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoRegisterComponent } from './producto-register/producto-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroProductosPipe } from '../../../pipes/filtro-productos.pipe';
import { ExportExlsxCvsPdfComponent } from '../export-exlsx-cvs-pdf/export-exlsx-cvs-pdf.component';
@NgModule({
  declarations: [
    FiltroProductosPipe,
    ProductoListComponent,
    ProductoRegisterComponent,
    ExportExlsxCvsPdfComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule, 
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ProductoModule { }
