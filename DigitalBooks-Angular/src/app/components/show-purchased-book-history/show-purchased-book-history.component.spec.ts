import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPurchasedBookHistoryComponent } from './show-purchased-book-history.component';

describe('ShowPurchasedBookHistoryComponent', () => {
  let component: ShowPurchasedBookHistoryComponent;
  let fixture: ComponentFixture<ShowPurchasedBookHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPurchasedBookHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPurchasedBookHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
