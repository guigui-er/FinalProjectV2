import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcranPrincipal } from './ecran-principal';

describe('EcranPrincipal', () => {
  let component: EcranPrincipal;
  let fixture: ComponentFixture<EcranPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcranPrincipal],
    }).compileComponents();

    fixture = TestBed.createComponent(EcranPrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
