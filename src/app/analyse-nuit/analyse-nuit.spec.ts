import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseNuit } from './analyse-nuit';

describe('AnalyseNuit', () => {
  let component: AnalyseNuit;
  let fixture: ComponentFixture<AnalyseNuit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyseNuit],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyseNuit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
