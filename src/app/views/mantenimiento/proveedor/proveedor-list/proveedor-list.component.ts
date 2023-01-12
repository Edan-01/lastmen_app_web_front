import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/service/proveedor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css']
})
export class ProveedorListComponent implements OnInit {
  modalRef?: BsModalRef;
  proveedor:ProveedorModel[] = [];
  proveedorSelected:ProveedorModel = new ProveedorModel();
  tituloModal:string = "";
  filtro='';
  page =0;
  constructor(
    private _proveedorService:ProveedorService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllProveedor();
  }

  getAllProveedor()
  {
    debugger;
    this._proveedorService.getAll().subscribe(
      (data:ProveedorModel[] ) => {
        this.proveedor = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  editarRegistro(proveedor:ProveedorModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.proveedorSelected = proveedor;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR REGISTRO";
    this.proveedorSelected = new ProveedorModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllProveedor();      
    }
    this.modalRef?.hide();
  }


  modalDelete(proveedor:ProveedorModel)
  {
    let res= Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._proveedorService.delete(proveedor.idProveedor).subscribe(
          (data:number)=>{
            console.log(data);
        Swal.fire(
          'Eliminado!',
          'registro eliminado de forma satisfactoría.',
          'success'
        )
        this.getAllProveedor();
        });
        
      }
    })
    // let res = confirm("Está seguro de eliminar el registro");

    // if(res) // si es verdadero
    // {
    //   this._proveedorService.delete(proveedor.idProveedor).subscribe(
    //     (data:number)=>{
    //       console.log(data);
    //       alert("registro eliminado de forma satisfactoría");
    //       this.getAllProveedor();
    //     },
    //     err =>{
    //       //alert("ocurrio un error");
    //     }
    //   );
    // }
  }

}