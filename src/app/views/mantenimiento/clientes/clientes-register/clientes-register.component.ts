import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from 'src/app/models/clientes.model';
import { ClientesService } from 'src/app/service/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-register',
  templateUrl: './clientes-register.component.html',
  styleUrls: ['./clientes-register.component.css']
})
export class ClientesRegisterComponent implements OnInit {

  /*VARIABLES DE ENTRADA */
  @Input() clientes: ClienteModel = new ClienteModel();
  /*VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _clientesService: ClientesService
  ) {
    this.myForm = this.fb.group({
      
      idCliente: [null, [Validators.required]],
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      dni: [null, [Validators.required]],
    });
  }

  get f() { return this.myForm.controls; }

  ngOnInit(): void {
    /*FIXME: SET VALUE TRAE ERRORES CUANDO LOS ATRIBUTOS NO COINCIDEN AL 100% */
    //this.myForm.setValue(this.estado);
    this.myForm.patchValue(this.clientes);
  }

  closeModal(res: boolean) {
    this.closeModalEmmit.emit(res);
  }

  save()
  {
    /*FIXME: SI POR A O B, TENEMOS UN CAMPO DES-HABILITADO DESDE ANGULAR / NO TRAE ESE VALOR */
    //this.estado = this.myForm.value();
    
    this.clientes = this.myForm.getRawValue();
    debugger;
    if(this.clientes.idCliente == 0)
    {
      this.createClientes();
      
    }
    else{
      this.updateClientes();
    }

  }

  createClientes()
  {
    this._clientesService.create(this.clientes).subscribe(
      (data:ClienteModel)=>{
       // alert("Registro creado de forma satisfactoría");
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
  updateClientes()
  {
    this._clientesService.update(this.clientes).subscribe(
      (data:ClienteModel)=>{
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

