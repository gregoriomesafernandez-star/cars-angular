import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNew } from './car-new';

describe('CarNew', () => {
  let component: CarNew;
  let fixture: ComponentFixture<CarNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarNew],
    }).compileComponents();

    fixture = TestBed.createComponent(CarNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
