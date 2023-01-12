import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {
  modalRef?: BsModalRef;

  categoria:CategoriaModel[] = [];
  categoriaSelected:CategoriaModel = new CategoriaModel();
  tituloModal:string = "";
  page=0;
  filtro='';
  constructor(
    private _categoriaService:CategoriaService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllCategoria();
  }

  getAllCategoria()
  {
    this._categoriaService.getAll().subscribe(
      (data:CategoriaModel[]) => {
        this.categoria = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  editarRegistro(categoria:CategoriaModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.categoriaSelected = categoria;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR REGISTRO";
    this.categoriaSelected = new CategoriaModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllCategoria();      
    }
    this.modalRef?.hide();
  }


  modalDelete(categoria:CategoriaModel)
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
        this._categoriaService.delete(categoria.idCategoria).subscribe(
            (data:number)=>{
            console.log(data);
        Swal.fire(
          'Eliminado!',
          'registro eliminado de forma satisfactoría.',
          'success'
        )
        this.getAllCategoria();
        });
        
      }
    })
    // let res = confirm("Está seguro de eliminar el registro");

    // if(res) // si es verdadero
    // {
    //   this._categoriaService.delete(categoria.idCategoria).subscribe(
    //     (data:number)=>{
    //       console.log(data);
    //       alert("registro eliminado de forma satisfactoría");
    //       this.getAllCategoria();
    //     },
    //     err =>{
    //       //alert("ocurrio un error");
    //     }
    //   );
    // }
  }

}
