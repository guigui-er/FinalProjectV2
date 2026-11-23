import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CafePage } from './cafe-page';

describe('CafePage', () => {
  let component: CafePage;
  let fixture: ComponentFixture<CafePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafePage],
    }).compileComponents();

    fixture = TestBed.createComponent(CafePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
