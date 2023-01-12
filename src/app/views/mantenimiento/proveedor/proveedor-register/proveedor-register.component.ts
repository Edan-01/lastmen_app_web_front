import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/service/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor-register',
  templateUrl: './proveedor-register.component.html',
  styleUrls: ['./proveedor-register.component.css']
})
export class ProveedorRegisterComponent implements OnInit {

  /*VARIABLES DE ENTRADA */
  @Input() proveedor: ProveedorModel = new ProveedorModel();
  /*VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _proveedorService: ProveedorService
  ) {
    this.myForm = this.fb.group({
      idProveedor: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      ruc: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      telefono: [null, [Validators.required]],
      correo: [null, [Validators.required]],
    });
  }

  get f() { return this.myForm.controls; }

  ngOnInit(): void {
    /*FIXME: SET VALUE TRAE ERRORES CUANDO LOS ATRIBUTOS NO COINCIDEN AL 100% */
    //this.myForm.setValue(this.estado);
    this.myForm.patchValue(this.proveedor);
  }

  closeModal(res: boolean) {
    this.closeModalEmmit.emit(res);
  }

  save()
  {
    /*FIXME: SI POR A O B, TENEMOS UN CAMPO DES-HABILITADO DESDE ANGULAR / NO TRAE ESE VALOR */
    //this.estado = this.myForm.value();
    
    this.proveedor = this.myForm.getRawValue();
    debugger;
    if(this.proveedor.idProveedor == 0)
    {
      this.createProveedor();
      
    }
    else{
      this.updateProveedor();
    }

  }

  createProveedor()
  {
    this._proveedorService.create(this.proveedor).subscribe(
      (data:ProveedorModel)=>{
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
  updateProveedor()
  {
    this._proveedorService.update(this.proveedor).subscribe(
      (data:ProveedorModel)=>{
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

