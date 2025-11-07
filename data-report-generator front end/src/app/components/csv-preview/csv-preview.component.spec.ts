import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvPreviewComponent } from './csv-preview.component';

describe('CsvPreviewComponent', () => {
  let component: CsvPreviewComponent;
  let fixture: ComponentFixture<CsvPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
