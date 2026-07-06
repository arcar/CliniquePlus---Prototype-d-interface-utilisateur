import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modifperso } from './modifperso';

describe('Modifperso', () => {
  let component: Modifperso;
  let fixture: ComponentFixture<Modifperso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modifperso],
    }).compileComponents();

    fixture = TestBed.createComponent(Modifperso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
