import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, inject } from '@angular/core';

import { CarouselCards } from './carousel-cards/carousel-cards';

@Component({
  selector: 'app-projets',
  imports: [CarouselCards],
  templateUrl: './projets.html',
  styleUrl: './projets.css',
  host: {
    '(document:wheel)': 'handleWheel($event)',
    '(document:mousedown)': 'handleMouseDown($event)',
    '(document:mousemove)': 'handleMouseMove($event)',
    '(document:mouseup)': 'handleMouseUp()',
    '(document:touchstart)': 'handleMouseDown($event)',
    '(document:touchmove)': 'handleMouseMove($event)',
    '(document:touchend)': 'handleMouseUp()',
  },
})
export class Projets implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  private progress = 50;
  private startX = 0;
  private active = 0;
  private isDown = false;

  private readonly speedWheel = 0.02;
  private readonly speedDrag = -0.1;

  private items: HTMLElement[] = [];
  private cursors: HTMLElement[] = [];
  private removeItemClickListeners: Array<() => void> = [];

  ngAfterViewInit(): void {
    const root = this.elementRef.nativeElement;
    this.items = Array.from(root.querySelectorAll('.carousel-item')) as HTMLElement[];
    this.cursors = Array.from(root.querySelectorAll('.cursor')) as HTMLElement[];

    this.removeItemClickListeners = this.items.map((item, index) =>
      this.renderer.listen(item, 'click', () => {
        this.progress = (index / this.items.length) * 100 + 10;
        this.animate();
      }),
    );

    this.animate();
  }

  ngOnDestroy(): void {
    this.removeItemClickListeners.forEach((removeListener) => removeListener());
  }

  handleWheel(event: WheelEvent): void {
    this.progress = this.progress + event.deltaY * this.speedWheel;
    this.animate();
  }

  handleMouseMove(event: MouseEvent | TouchEvent): void {
    if (event instanceof MouseEvent) {
      this.cursors.forEach((cursor) => {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      });
    }

    if (!this.isDown) {
      return;
    }

    const x = this.getClientX(event);
    this.progress = this.progress + (x - this.startX) * this.speedDrag;
    this.startX = x;
    this.animate();
  }

  handleMouseDown(event: MouseEvent | TouchEvent): void {
    this.isDown = true;
    this.startX = this.getClientX(event);
  }

  handleMouseUp(): void {
    this.isDown = false;
  }

  private animate(): void {
    if (this.items.length === 0) {
      return;
    }

    this.progress = Math.max(0, Math.min(this.progress, 100));
    this.active = Math.floor((this.progress / 100) * (this.items.length - 1));

    this.items.forEach((item, index) => {
      const offset = index - this.active;
      const normalizedDistance = Math.abs(offset) / Math.max(1, this.items.length - 1);
      const bend = normalizedDistance * normalizedDistance;
      const zIndex = this.getZIndex(this.items.length, index, this.active);

      item.style.setProperty('--zIndex', String(zIndex));
      item.style.setProperty('--active', String((index - this.active) / this.items.length));
      item.style.setProperty('--offset', String(offset));
      item.style.setProperty('--bend', String(bend));
    });
  }

  private getClientX(event: MouseEvent | TouchEvent): number {
    if (event instanceof MouseEvent) {
      return event.clientX;
    }

    return event.touches[0]?.clientX ?? this.startX;
  }

  private getZIndex(length: number, index: number, active: number): number {
    return index === active ? length : length - Math.abs(index - active);
  }
}
