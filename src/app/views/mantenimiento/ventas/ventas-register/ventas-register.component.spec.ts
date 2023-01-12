import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentasRegisterComponent } from './ventas-register.component';

describe('VentasRegisterComponent', () => {
  let component: VentasRegisterComponent;
  let fixture: ComponentFixture<VentasRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
