import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'rol',
    loadChildren:() => import("./roles/roles.module").then(x => x.RolesModule)
  },  
  {
    path:'producto',
    loadChildren:() => import("./producto/producto.module").then(x => x.ProductoModule)
  },  
  {
    path:'cliente',
    loadChildren:() => import("./clientes/clientes.module").then(x => x.ClientesModule)
  },
  {
    path:'proveedor',
    loadChildren:() => import("./proveedor/proveedor.module").then(x => x.ProveedorModule)
  },
  {
    path:'categoria',
    loadChildren:() => import("./categoria/categoria.module").then(x => x.CategoriaModule)
  },
  {
    path:'usuario',
    loadChildren:() => import("./usuario/usuario.module").then(x => x.UsuarioModule)
  },  
  {
    path:'ventas',
    loadChildren:() => import("./ventas/ventas.module").then(x => x.VentasModule)
  },
  {
    path:'detalleventas',
    loadChildren:() => import("./detalle-venta/detalle-venta.module").then(x => x.DetalleVentaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
