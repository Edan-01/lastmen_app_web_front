export class ClienteModel {
    idCliente: number;
    nombres: string;
    apellidos: string;
    direccion: string;
    celular: string;
    dni:string;
 
    constructor() {
        this.idCliente = 0;
        this.nombres = "";
        this.apellidos = "";
        this.direccion = "";
        this.celular = "";
        this.dni="";
    }
}
