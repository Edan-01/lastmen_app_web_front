import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/service/producto.service';
import{CategoriaService} from'src/app/service/categoria.service';
import{ProveedorService} from'src/app/service/proveedor.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-producto-register',
  templateUrl: './producto-register.component.html',
  styleUrls: ['./producto-register.component.css']
})
export class ProductoRegisterComponent implements OnInit {

  /*VARIABLES DE ENTRADA */
  @Input() producto: ProductoModel = new ProductoModel();
  /*VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;
  pipe = new DatePipe('en-US');
  categoria$!:Observable<any[]>;
  categoria:any=[];
  proveedor$!:Observable<any[]>;
  proveedor:any=[];
  constructor(
    private _categoriaservice:CategoriaService,
    private _proveedorservice:ProveedorService,
    private fb: FormBuilder,
    private _productoService: ProductoService
  ) {
    this.myForm = this.fb.group({
      
      idProducto: [null, [Validators.required]],
      idCategoria: [null, [Validators.required]],
      idProveedor: [null, [Validators.required]],
      nombreProducto: [null, [Validators.required]],
      precioCompra: [null, [Validators.required]],
      precioVenta: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      lote: [null, [Validators.required]],
      unidad_Medida: [null, [Validators.required]],
      fechaIngreso: [null, [Validators.required]],
      fechaVencimiento: [null, [Validators.required]],
      descripcion:[null, [Validators.required]],
    });
  }

  get f() { return this.myForm.controls; }
 
  ngOnInit(): void {
    /*FIXME: SET VALUE TRAE ERRORES CUANDO LOS ATRIBUTOS NO COINCIDEN AL 100% */
    //this.myForm.setValue(this.estado);
    this.myForm.patchValue(this.producto);
    this.categoriagetall();
    this.proveedorgetall();
    
  }
  
  
  proveedorgetall(){
    this._proveedorservice.getAll().subscribe(data=>{
      this.proveedor=data;
    })
  }
  categoriagetall(){
    this._categoriaservice.getAll().subscribe(data=>{
      this.categoria=data;
    })
  }
  
  closeModal(res: boolean) {
    this.closeModalEmmit.emit(res);
  }
  
  save()
  {
    /*FIXME: SI POR A O B, TENEMOS UN CAMPO DES-HABILITADO DESDE ANGULAR / NO TRAE ESE VALOR */
    //this.estado = this.myForm.value();
   
    this.producto = this.myForm.getRawValue();
    if(this.producto.idProducto == 0)
    {
      this.createProducto();
      
    }
    else{
      this.updateProducto();
    }

  }

  createProducto()
  {
    let product: any = this.myForm.value;
    
    product.fechaIngreso = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    
    this._productoService.create(product).subscribe(
      (data:ProductoModel)=>{
        //alert("Registro creado de forma satisfactoría");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro creado de forma satisfactoría',
          showConfirmButton: false,
          timer:1650
          });
        this.closeModalEmmit.emit(true);
      },
      err => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }
  updateProducto()
  {
    this._productoService.update(this.producto).subscribe(
      (data:ProductoModel)=>{
        //alert("Registro actualizado de forma satisfactoría");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro actualizado de forma satisfactoría',
          showConfirmButton: false,
          timer:1650
          });
        this.closeModalEmmit.emit(true);
      },
      err => {
        console.log(err);
        this.closeModalEmmit.emit(false);
      }
    );
  }

  

}
