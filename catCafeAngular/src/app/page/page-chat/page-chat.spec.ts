import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageChat } from './page-chat';

describe('PageChat', () => {
  let component: PageChat;
  let fixture: ComponentFixture<PageChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageChat]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
