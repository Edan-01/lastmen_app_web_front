import { ComponentFixture, TestBed } from '@angular/core/testing';
import { detalleVentaListComponent } from './detalle-venta-list.component';

describe('DetalleVentaListComponent', () => {
  let component: detalleVentaListComponent;
  let fixture: ComponentFixture<detalleVentaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ detalleVentaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(detalleVentaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
