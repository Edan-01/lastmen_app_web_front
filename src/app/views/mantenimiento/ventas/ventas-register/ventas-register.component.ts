import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClienteModel } from 'src/app/models/clientes.model';
import { VentasModel } from 'src/app/models/ventas.model';
import { ClientesService } from 'src/app/service/clientes.service';
import { SesionService } from 'src/app/service/sesion.service';
import { VentasService } from 'src/app/service/ventas.service';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/service/producto.service';
import { DetalleVentaModel } from 'src/app/models/detalleVentas.model';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas-register',
  templateUrl: './ventas-register.component.html',
  styleUrls: ['./ventas-register.component.css'],
})
export class VentasRegisterComponent implements OnInit {
  page = 0;
  filtro = '';
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  /*VARIABLES DE ENTRADA */
  @Input() ventas: VentasModel = new VentasModel();
  /*VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  modalRef?: BsModalRef;
  myForm: FormGroup;
  // cliente
  clienteSelect: ClienteModel = new ClienteModel();
  clienteList: ClienteModel[] = [];
  //producto
  producto: ProductoModel[] = [];
  productoselect: ProductoModel = new ProductoModel();
  //usuario
  usuario: any = {};
  total_price: number = 0;
  productoseleccionados: ProductoModel[] = [];
  tituloModal: string = '';
  miVenta: VentasModel = new VentasModel();
  constructor(
    private modalService: BsModalService,
    private _sesionSevice: SesionService,
    private fb: FormBuilder,
    private _clienteServece: ClientesService,
    private _ventasService: VentasService,
    private _produtoservice: ProductoService
  ) {
    this.myForm = this.fb.group({
      idVenta: [null, [Validators.required]],
      idUsuario: [null, [Validators.required]],
      idCliente: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      tipoComprobante: [null, [Validators.required]],
      //formArray
      DetalleVentas: this.fb.array([]),
    });
  }

  get f() {
    return this.myForm.controls;
  }
  get DetalleVentas(): FormArray {
    return this.myForm.get('DetalleVentas') as FormArray;
  }

  ngOnInit(): void {
    /*FIXME: SET VALUE TRAE ERRORES CUANDO LOS ATRIBUTOS NO COINCIDEN AL 100% */
    //this.myForm.setValue(this.estado);
    this.myForm.patchValue(this.ventas);
    this.obetenerUsuario();
  }

  newVentaArray(detalle: DetalleVentaModel): FormGroup {
    return this.fb.group({
      idDetalleVenta: [
        { value: detalle.idDetalleCompra, disabled: true },
        [Validators.required],
      ],
      idVenta: [detalle.idVenta, [Validators.required]],
      idProducto: [detalle.idProducto, [Validators.required]],
      cantidad: [detalle.cantidad, [Validators.required]],
      descuento: [detalle.descuento, [Validators.required]],
      precio_unitario: [detalle.precio_unitario, [Validators.required]],
      nombre_producto: [detalle.nombre_producto, []],
      descripcion_producto: [detalle.descripcion_producto, []],
      stock: [detalle.stock, []],
      precio_total: [0, []],
    });
    
  }

  obetenerUsuario() {
    this.usuario = this._sesionSevice.getUser();
  }
  openListCliente(template: TemplateRef<any>) {
    this._clienteServece.getAll().subscribe((data: ClienteModel[]) => {
      this.clienteList = data;
      this.openModal(template);
    });
  }
  openListProducto(template: TemplateRef<any>) {
    this._produtoservice.getAll().subscribe((data: ProductoModel[]) => {
      this.producto = data;
      this.openModal(template);
      
      
    });
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(
        {},
        {
          class: 'gray modal-lg modal-dialog-centered',
          ignoreBackdropClick: true,
          keyboard: true,
        }
      )
    );
  }

  closeModal(res: boolean) {
    this.closeModalEmmit.emit(res);
  }

  onChangeCliente(obj: ClienteModel) {
    this.clienteSelect = obj;
    this.modalRef?.hide();
  }
  onChangeProducto(obj: ProductoModel) {
    this.productoselect = obj;
    this.modalRef?.hide();
  }

  save() {
    this.ventas = this.myForm.getRawValue();
    debugger;
    if (this.ventas.idVenta == 0) {
      
      this.createVentas();
    } else {
      this.updateVentas();
    }
  }

  createVentas() {
    
    this._ventasService.create(this.ventas).subscribe(
      (data: VentasModel) => {
        // alert("Registro creado de forma satisfactoría");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro creado de forma satisfactoría',
          showConfirmButton: false,
          timer: 1650,
        });
        this.closeModalEmmit.emit(true);
      },
      (err) => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }
  updateVentas() {
    this._ventasService.update(this.ventas).subscribe(
      (data: VentasModel) => {
        // alert("Registro actualizado de forma satisfactoría");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro actualizado de forma satisfactoría',
          showConfirmButton: false,
          timer: 1650,
        });
        this.closeModalEmmit.emit(true);
      },
      (err) => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }
  agregarproducto(e: any, producto: ProductoModel) {
    let checked: boolean;
    checked = e.target.checked;
    if (checked) {
      let detalleVenta: DetalleVentaModel;
      detalleVenta = new DetalleVentaModel();
      detalleVenta.stock = producto.cantidad;
      detalleVenta.cantidad = 1;
      detalleVenta.descuento = 0;
      detalleVenta.idDetalleCompra = 0;
      detalleVenta.idProducto = producto.idProducto;
      detalleVenta.idVenta = 0;
      detalleVenta.nombre_producto = producto.nombreProducto;
      detalleVenta.descripcion_producto = producto.descripcion;
      detalleVenta.precio_unitario = producto.precioVenta;
      this.DetalleVentas.push(this.newVentaArray(detalleVenta));
        e.target.disabled = true
        
      
    }
  }
  removeElement(i: number) {
    this.total_price = 0;
    this.DetalleVentas.removeAt(i);

    let detalles: DetalleVentaModel[];
    detalles = this.DetalleVentas.getRawValue();
    detalles.forEach((x) => {
      this.total_price = this.total_price + x.precio_total;
    });
  }

  changerValueFormArray(i: number) {
    this.total_price = 0;
    let obj_1: DetalleVentaModel;
    obj_1 = new DetalleVentaModel();
    obj_1 = this.DetalleVentas.controls[i].value;
    let precio_total = obj_1.cantidad * obj_1.precio_unitario - obj_1.descuento;

    let obj = this.DetalleVentas.controls[i]
      .get('precio_total')
      ?.setValue(precio_total);

    let detalles: DetalleVentaModel[];
    detalles = this.DetalleVentas.getRawValue();

    detalles.forEach((x) => {
      this.total_price = this.total_price + x.precio_total;
    });
  }

  realizarVenta(template: TemplateRef<any>) {
    let venta: any = this.myForm.value;
    venta.idUsuario = this.usuario.idUsuario;
    venta.idCliente = this.clienteSelect.idCliente;
    venta.fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    venta.tipoComprobante = 'Boleta Electronica';

    this._ventasService.create(venta).subscribe(
      (data: any) => {
        console.log();
        //alert("Venta Realizada de forma satisfactoría");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Venta Realizada de forma satisfactoría',
          showConfirmButton: false,
          timer: 1650,
        });
        this.miVenta = data;
        console.log(this.miVenta);
      },
      (err) => {}
    );

    setTimeout(() => {
      this.tituloModal = 'COMPROBANTE DE PAGO';
      this.openModal(template);
    }, 2000);
  }

  listVenta(template: TemplateRef<any>) {
    this.openModal(template);
  }
}
