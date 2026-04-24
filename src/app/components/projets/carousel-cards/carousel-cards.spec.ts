import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCards } from './carousel-cards';

describe('CarouselCards', () => {
  let component: CarouselCards;
  let fixture: ComponentFixture<CarouselCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselCards],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
