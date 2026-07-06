import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseCpapJour } from './analyse-cpap-jour';

describe('AnalyseCpapJour', () => {
  let component: AnalyseCpapJour;
  let fixture: ComponentFixture<AnalyseCpapJour>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyseCpapJour],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyseCpapJour);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
