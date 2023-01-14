import { Component, Input, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/clientes.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { VentasModel } from 'src/app/models/ventas.model';
import { ClientesService } from 'src/app/service/clientes.service';
import { ProductoService } from 'src/app/service/producto.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DetalleVentaModel } from 'src/app/models/detalleVentas.model';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ventas-comprobante',
  templateUrl: './ventas-comprobante.component.html',
  styleUrls: ['./ventas-comprobante.component.css'],
})
export class VentasComprobanteComponent implements OnInit {
  @Input() venta: VentasModel = new VentasModel();
  detalleVenta: DetalleVentaModel = new DetalleVentaModel();
  cliente: ClienteModel = new ClienteModel();
  usuario: UsuarioModel = new UsuarioModel();
  producto: ProductoModel[] = [];
  total: number = 0.00;
  totolfinal: number = 0.00;
  constructor(
    private _clienteservice: ClientesService,
    private _usuarioservice: UsuarioService,
    private _productoService: ProductoService
  ) {}

  ngOnInit(): void {
    console.log(this.venta);
    this.obtenerUsuario();
    this.obtenerCliente();
    this.obtenerproducto();
    this.venta.detalleVentas.forEach((x) => {
      this.total = this.total + x.precio_unitario * x.cantidad - x.descuento;
    });
  }

  obtenerproducto() {
    this._productoService.getAll().subscribe(
      (data: ProductoModel[]) => {
        this.producto = data;
        this.venta.detalleVentas.forEach((x) => {
          let prod = this.producto.filter(
            (p) => p.idProducto == x.idProducto
          )[0];
          x.producto = prod;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  obtenerCliente() {
    this._clienteservice
      .getById(this.venta.idCliente)
      .subscribe((data: any) => {
        this.cliente = data;
        console.log(data);
      });
  }

  obtenerUsuario() {
    this._usuarioservice
      .getById(this.venta.idUsuario)
      .subscribe((data: any) => {
        this.usuario = data;
        console.log(data);
      });
  }

  PrintElem() {
    var elem = document.getElementById('app2');
    if (!elem) {
      alert("No se encontró el elemento con id 'app2'");
      return;
    }
    var mywindow: any = window.open('', 'PRINT', 'height=1000,width=800');
    let app2 = document.getElementById('app2');
    if (app2) {
      mywindow.document.write(
        '<html><head><title>' + document.title + '</title>'
      );
      mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + document.title + '</h1>');
      html2canvas(elem, { allowTaint: true }).then((canvas) => {
        var imgData = canvas.toDataURL('image/png');
        mywindow.document.write('<img src="' + imgData + '" />');
        mywindow.document.write('</body></html>');
        mywindow.focus();
        mywindow.print();
        mywindow.document.close();
        return true;
      });
    }
  }
}
