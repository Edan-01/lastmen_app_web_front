import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria-register',
  templateUrl: './categoria-register.component.html',
  styleUrls: ['./categoria-register.component.css']
})
export class CategoriaRegisterComponent implements OnInit {

  /*VARIABLES DE ENTRADA */
  @Input() categoria: CategoriaModel = new CategoriaModel();
  /*VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _categoriaService: CategoriaService
  ) {
    this.myForm = this.fb.group({
      
      idCategoria: [null, [Validators.required]],
      nombreCategoria: [null, [Validators.required]],
    });
  }

  get f() { return this.myForm.controls; }

  ngOnInit(): void {
    /*FIXME: SET VALUE TRAE ERRORES CUANDO LOS ATRIBUTOS NO COINCIDEN AL 100% */
    //this.myForm.setValue(this.estado);
    this.myForm.patchValue(this.categoria);
  }

  closeModal(res: boolean) {
    this.closeModalEmmit.emit(res);
  }

  save()
  {
    /*FIXME: SI POR A O B, TENEMOS UN CAMPO DES-HABILITADO DESDE ANGULAR / NO TRAE ESE VALOR */
    //this.estado = this.myForm.value();
    
    this.categoria = this.myForm.getRawValue();
    debugger;
    if(this.categoria.idCategoria == 0)
    {
      this.createCategoria();
      
    }
    else{
      this.updateCategoria();
    }

  }

  createCategoria()
  {
    this._categoriaService.create(this.categoria).subscribe(
      (data:CategoriaModel)=>{
       // alert("Registro creado de forma satisfactoría");
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro creado de forma satisfactorías',
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
  updateCategoria()
  {
    this._categoriaService.update(this.categoria).subscribe(
      (data:CategoriaModel)=>{
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
