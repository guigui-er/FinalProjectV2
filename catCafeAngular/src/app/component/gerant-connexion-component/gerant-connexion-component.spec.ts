import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerantConnexionComponent } from './gerant-connexion-component';

describe('GerantConnexionComponent', () => {
  let component: GerantConnexionComponent;
  let fixture: ComponentFixture<GerantConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerantConnexionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GerantConnexionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
