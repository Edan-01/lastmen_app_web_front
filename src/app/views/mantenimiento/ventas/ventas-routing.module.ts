import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasRegisterComponent } from './ventas-register/ventas-register.component';
import { VentasListComponent } from './ventas-list/ventas-list.component';

const routes: Routes = [
  {
    path: '',
    component: VentasRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
