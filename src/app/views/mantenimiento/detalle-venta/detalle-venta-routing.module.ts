import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { detalleVentaListComponent } from './detalle-venta-list/detalle-venta-list.component';

const routes: Routes = [
  {
    path: '',
    component: detalleVentaListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleVentaRoutingModule { }
