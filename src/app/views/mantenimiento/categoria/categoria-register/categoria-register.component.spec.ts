import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaRegisterComponent } from './categoria-register.component';

describe('CategoriaRegisterComponent', () => {
  let component: CategoriaRegisterComponent;
  let fixture: ComponentFixture<CategoriaRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
