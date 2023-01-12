import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasComprobanteComponent } from './ventas-comprobante.component';

describe('VentasComprobanteComponent', () => {
  let component: VentasComprobanteComponent;
  let fixture: ComponentFixture<VentasComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasComprobanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
