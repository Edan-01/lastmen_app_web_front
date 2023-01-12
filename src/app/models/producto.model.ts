export class ProductoModel {
  idProducto: number;
  idCategoria: number;
  idProveedor: number;
  nombreProducto: string;
  descripcion: string;
  unidad_Medida: string;
  cantidad: number;
  fechaVencimiento: string;
  precioCompra: number;
  precioVenta: number;
  lote: string;
  fechaIngreso: string;
  url_Img: string;

  constructor() {
    this.idProducto = 0;
    this.idCategoria = 0;
    this.idProveedor = 0;
    this.nombreProducto = '';
    this.descripcion = '';
    this.unidad_Medida = '';
    this.cantidad = 0;
    this.fechaVencimiento = '';
    this.precioCompra = 0.0;
    this.precioVenta = 0.0;
    this.lote = '';
    this.fechaIngreso = '';
    this.url_Img = '';
  }
}
