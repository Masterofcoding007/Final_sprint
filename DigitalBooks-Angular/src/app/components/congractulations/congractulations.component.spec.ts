import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongractulationsComponent } from './congractulations.component';

describe('CongractulationsComponent', () => {
  let component: CongractulationsComponent;
  let fixture: ComponentFixture<CongractulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongractulationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongractulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
