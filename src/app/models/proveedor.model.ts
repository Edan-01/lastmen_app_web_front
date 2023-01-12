export class ProveedorModel {
    idProveedor: number;
    nombre: string;
    ruc: string;
    direccion: string;
    telefono :string;
    correo:string;
    
    constructor(){
        this.idProveedor=0;
        this.nombre="";
        this.ruc="";
        this.direccion="";
        this.telefono="";
        this.correo="";
    }
} 
