import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoRegisterComponent } from './producto-register.component';

describe('ProductoRegisterComponent', () => {
  let component: ProductoRegisterComponent;
  let fixture: ComponentFixture<ProductoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
