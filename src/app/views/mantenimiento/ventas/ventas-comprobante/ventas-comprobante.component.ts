import { Component, Input, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/clientes.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { VentasModel } from 'src/app/models/ventas.model';
import { ClientesService } from 'src/app/service/clientes.service';
import { ProductoService } from 'src/app/service/producto.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-ventas-comprobante',
  templateUrl: './ventas-comprobante.component.html',
  styleUrls: ['./ventas-comprobante.component.css'],
})
export class VentasComprobanteComponent implements OnInit {
  @Input() venta: VentasModel = new VentasModel();

  cliente: ClienteModel = new ClienteModel();
  usuario: UsuarioModel = new UsuarioModel();
  producto: ProductoModel[] = [];
  total: number = 0;
  constructor(
    private _clienteservice: ClientesService,
    private _usuarioservice: UsuarioService,
    private _productoService: ProductoService
  ) {}

  ngOnInit(): void {
    console.log(this.venta);
    // this.generarBoleta();
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
    var mywindow: any = window.open('', 'PRINT', 'height=400,width=600');
    let app2 = document.getElementById('app2');
    if (app2) {
      let html = app2.innerHTML; //This
      let styles = window.getComputedStyle(app2, null);
      let css = '';
      for (let i = 0; i < styles.length; i++) {
        css += styles[i] + ':' + styles.getPropertyValue(styles[i]) + ';';
      }
      let styleTag = mywindow.document.createElement('style');
      styleTag.innerHTML = css;
      mywindow.document.head.appendChild(styleTag);
      mywindow.document.write(html);
    }
    // Continuar con el resto de la función

    // let html = document.getElementById("app2").innerHTML;
    // mywindow.document.write('<html><head><title>' + document.title + 'COMPROBANTE');
    // mywindow.document.write('<link rel="stylesheet" href="ventas-comprobante.component.css">')
    // mywindow.document.write('</head><body>');
    // mywindow.document.write('<h1>' + document.title + '</h1>');
    // mywindow.document.write(html);
    // mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
  }
}
