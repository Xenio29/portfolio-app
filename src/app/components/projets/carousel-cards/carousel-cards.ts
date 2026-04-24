import { Component, input } from '@angular/core';

@Component({
  selector: 'app-carousel-cards',
  imports: [],
  templateUrl: './carousel-cards.html',
  styleUrl: './carousel-cards.css',
})
export class CarouselCards {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly number = input.required<string>();
  readonly imageClass = input.required<string>();
  readonly imageSrc = input.required<string>();
  readonly imageAlt = input.required<string>();
}
