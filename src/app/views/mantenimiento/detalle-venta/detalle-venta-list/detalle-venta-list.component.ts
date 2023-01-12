import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DetalleVentaModel } from 'src/app/models/detalleVentas.model';
import { detalleventaService } from 'src/app/service/detalleventa.service';
import {ProductoService} from'src/app/service/producto.service';
import {ClientesService} from'src/app/service/clientes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-venta-list',
  templateUrl: './detalle-venta-list.component.html',
  styleUrls: ['./detalle-venta-list.component.css']
})
export class detalleVentaListComponent implements OnInit {
  modalRef?: BsModalRef;
  detalleVenta:DetalleVentaModel[] = [];
  detalleVentaSelected:DetalleVentaModel = new DetalleVentaModel();
  
  tituloModal:string = "";
  detalleExport: any = [];
  headerColumns: any=[
    {header: 'ID DETALLE VENTA',datakey:'idDetalleCompra'},
    {header: 'IDVENTA',datakey:'idVenta'},
    {header: 'IDPRODUCTO',datakey:'idProducto'},
    {header: 'CANTIDAD',datakey:'cantidad'},
    {header: 'PRECIO VENTA',datakey:'precioVenta'},
    {header: 'DESCUENTO',datakey:'descuento'},
  ];
  productoTiplist$!:Observable<any[]>;
  productoTiplist:any=[];
  productoTipoMap:Map<number,string>=new Map()
  page =0;
  constructor(
    private _detalleVentaservice:detalleventaService,
    private _productoService:ProductoService,
    public modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllDetalleVenta();
    this.productoTiplist$=this._productoService.getAll();
    this.refreshProductotipoMap();
  }
  refreshProductotipoMap(){
    this._productoService.getAll().subscribe(data=>{
      this.productoTiplist=data;
      for(let i=0; i<data.length;i++){
        this.productoTipoMap.set(this.productoTiplist[i].idProducto,this.productoTiplist[i].nombreProducto);
      }
    })
  }
  
 getAllPDF()
  {
    this.detalleVenta = [];
    this.detalleExport = [];
    this._detalleVentaservice.getAll().subscribe(
      (data:DetalleVentaModel[]) => {
        this.detalleVenta = data;
        this.detalleVenta.map(x => {
          this.detalleExport.push({
          'idDetalleVenta': x.idDetalleCompra,
          'idVenta': x.idVenta,
          'idProducto': x.idProducto,
          'cantidad': x.cantidad,
          'precioVenta': x.precio_unitario,
          'descuento': x.descuento,
                  
          });
        });
      },
      (err) => {
      }
    );
  }
  getAllDetalleVenta()
  {
    this._detalleVentaservice.getAll().subscribe(
      (data:DetalleVentaModel[]) => {
        this.detalleVenta = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  editarRegistro(detalleVenta:DetalleVentaModel,template: TemplateRef<any>)
  {
    this.tituloModal="EDITAR REGISTRO";
    this.detalleVentaSelected = detalleVenta;
    this.openModal(template);
  }

  crearRegistro(template: TemplateRef<any>)
  {
    this.tituloModal="CREAR CITA";
    this.detalleVentaSelected = new DetalleVentaModel();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recibeCloseModal(res:boolean)
  {
    if(res) //==> si es verdadero
    {
      this.getAllDetalleVenta();      
    }
    this.modalRef?.hide();
  }


  modalDelete(detalleVenta:  DetalleVentaModel)
  {
    let res = confirm("Esta seguro de eliminar el registro");

    if(res) // si es verdadero
    {
      this._detalleVentaservice.delete(detalleVenta.idDetalleCompra).subscribe(
        (data:number)=>{
          console.log(data);
          alert("registro eliminado de forma satisfactoria");
          this.getAllDetalleVenta();
        },
        err =>{
          //alert("ocurrio un error");
        }
      );
    }
  }
  PrintElem() {
    var mywindow: any = window.open('', 'PRINT', 'height=400,width=600');
    let html = document.getElementById("app2")?.innerHTML;
    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title + '</h1>');
    mywindow.document.write(html);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
  }

}
