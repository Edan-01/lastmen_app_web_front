export class UsuarioModel {
    idUsuario: number;
    usuario: string;
    tipoUsuario: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    password:string;
    correo:string;
    
    constructor(){
        this.idUsuario=0;
        this.usuario="";
        this.tipoUsuario="";
        this.nombres="";
        this.apellidos="";
        this.direccion="";
        this.password="";
        this.correo="";
    }
} 
