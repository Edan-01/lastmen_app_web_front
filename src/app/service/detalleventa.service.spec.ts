import { TestBed } from '@angular/core/testing';

import { detalleventaService } from './detalleventa.service';

describe('CategoriaService', () => {
  let service: detalleventaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(detalleventaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
