import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  VentasModel } from 'src/app/models/ventas.model';
import { VentasService } from 'src/app/service/ventas.service';
import {ClientesService} from'src/app/service/clientes.service';
import {UsuarioService} from'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css'],
})

export class VentasListComponent implements OnInit {
  modalRef?: BsModalRef;
  filtro='';
  page = 0;
  ventas:VentasModel[] = [];
  ventasSelected:VentasModel = new VentasModel();
  tituloModal:string = "";
  // itemsPerPage = 10;

  clienteTiplist$!:Observable<any[]>;
  clienteTiplist:any=[];
  clienteTipoMap:Map<number,string>=new Map()

  usuarioTiplist$!:Observable<any[]>;
  usuarioTiplist:any=[];
  usuarioTipoMap:Map<number,string>=new Map()

  constructor(
    private _clienteservice:ClientesService,
    private _usuarioservice:UsuarioService,
    private _ventasService:VentasService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllVentas();
    this.clienteTiplist$=this._clienteservice.getAll();
    this.refreshClientetipoMap();
    this.refreshUsuariotipoMap();
  }
  refreshClientetipoMap(){
    this._clienteservice.getAll().subscribe(data=>{
      this.clienteTiplist=data;
      for(let i=0; i<data.length;i++){
        this.clienteTipoMap.set(this.clienteTiplist[i].idCliente,this.clienteTiplist[i].nombres);
      }
    })    
  }
  refreshUsuariotipoMap(){
    this._usuarioservice.getAll().subscribe(data=>{
      this.usuarioTiplist=data;
      for(let i=0; i<data.length;i++){
        this.usuarioTipoMap.set(this.usuarioTiplist[i].idUsuario,this.usuarioTiplist[i].nombres);
      }
    })
  }

  getAllVentas()
  {
    this._ventasService.getAll().subscribe(
      (data:VentasModel[]) => {
        this.ventas = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  
  // getAllVentas() {
  //   this._ventasService.getAll().subscribe(
  //     (data: VentasModel[]) => {
  //       this.ventas = data.sort((a, b) => {
  //         if (a.fecha > b.fecha) {
  //           return -1;
  //         } else if (a.fecha < b.fecha) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //       console.log(data);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  editarRegistro(ventas:VentasModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.ventasSelected = ventas;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR REGISTRO";
    this.ventasSelected = new VentasModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllVentas();      
    }
    this.modalRef?.hide();
  }


  modalDelete(ventas:VentasModel)
  {
    let res = confirm("Está seguro de eliminar el registro");

    if(res) // si es verdadero
    {
      this._ventasService.delete(ventas.idVenta).subscribe(
        (data:number)=>{
          console.log(data);
          //alert("registro eliminado de forma satisfactoría");
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'registro eliminado de forma satisfactoría',
            showConfirmButton: false,
            timer:1650
            });
          this.getAllVentas();
        },
        err =>{
          //alert("ocurrio un error");
        }
      );
    }
  }

}