import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerantPage } from './gerant-page';

describe('GerantPage', () => {
  let component: GerantPage;
  let fixture: ComponentFixture<GerantPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerantPage],
    }).compileComponents();

    fixture = TestBed.createComponent(GerantPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
