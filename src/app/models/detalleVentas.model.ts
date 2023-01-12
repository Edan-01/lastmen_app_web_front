import { ProductoModel } from "./producto.model";

export class DetalleVentaModel {
    idDetalleCompra: number;
    idVenta: number;
    idProducto: number;
    cantidad: number;
    descuento: number;
    stock: number;
    producto:ProductoModel;
    nombre_producto:string;
    descripcion_producto:string;
    precio_total:number;
    precio_unitario:number;
    
    constructor(){
        this.idDetalleCompra=0;
        this.idVenta=0;
        this.idProducto=0;
        this.cantidad=0;
        this.descuento=0.00;
        this.producto=new ProductoModel();
        this.nombre_producto ="";
        this.descripcion_producto ="";
        this.stock=0;
        this.precio_total=0;
        this.precio_unitario=0.00;
        
    }
}