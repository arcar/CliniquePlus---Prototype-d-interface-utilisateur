import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Choixperso } from './choixperso';

describe('Choixperso', () => {
  let component: Choixperso;
  let fixture: ComponentFixture<Choixperso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Choixperso],
    }).compileComponents();

    fixture = TestBed.createComponent(Choixperso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
