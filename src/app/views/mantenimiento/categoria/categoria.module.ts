import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaRegisterComponent } from './categoria-register/categoria-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroCategoriaPipe } from '../../../pipes/filtro-categoria.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    CategoriaListComponent,
    CategoriaRegisterComponent,
    FiltroCategoriaPipe
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class CategoriaModule { }

