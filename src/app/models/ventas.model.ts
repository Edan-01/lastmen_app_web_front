import { DetalleVentaModel } from "./detalleVentas.model";
export class VentasModel {
    idVenta: number;
    idUsuario: number;
    idCliente: number;
    fecha: string;
    tipoComprobante: string;
    detalleVentas: DetalleVentaModel[];

    // status: StatusModel;
    constructor() {
        this.idVenta = 0;
        this.idUsuario = 0;
        this.idCliente = 0;
        this.fecha = "";
        this.tipoComprobante = "";
        this.detalleVentas=[];
    }
}