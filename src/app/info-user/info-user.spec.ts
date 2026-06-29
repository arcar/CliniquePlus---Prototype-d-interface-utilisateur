import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUser } from './info-user';

describe('InfoUser', () => {
  let component: InfoUser;
  let fixture: ComponentFixture<InfoUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoUser],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
