import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupClientOrGerant } from './popup-client-or-gerant';

describe('PopupClientOrGerant', () => {
  let component: PopupClientOrGerant;
  let fixture: ComponentFixture<PopupClientOrGerant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupClientOrGerant],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupClientOrGerant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
