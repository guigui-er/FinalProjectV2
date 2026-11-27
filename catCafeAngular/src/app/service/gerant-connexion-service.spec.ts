import { TestBed } from '@angular/core/testing';
import { GerantConnexionService } from './gerant-connexion-service';

describe('GerantConnexionService', () => {
  let service: GerantConnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerantConnexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
