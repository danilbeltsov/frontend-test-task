import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  inject,
  input,
  NgZone,
  OnDestroy,
  QueryList,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  private ngZone: NgZone = inject(NgZone);

  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;
  @ContentChildren('slide', { read: ElementRef })
  slides!: QueryList<ElementRef>;

  // autoscroll interval in milliseconds
  public autoScroll = input<number | null>(null);
  public infiniteScroll = input<boolean>(true);

  private slideCount = signal<number>(0);

  private currentIndex = 0;
  private slideWidth = 0;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;

  private autoScrollInterval: any;

  ngAfterViewInit() {
    this.slideCount.set(this.slides.length);

    if (this.infiniteScroll()) {
      this.handleInfiniteScroll();
    }

    this.proceedSlide();
    this.startAutoScroll();
  }

  private handleInfiniteScroll(): void {
    const firstSlideClone = this.slides.first.nativeElement.cloneNode(true);
    const lastSlideClone = this.slides.last.nativeElement.cloneNode(true);

    this.carouselWrapper.nativeElement.insertBefore(
      lastSlideClone,
      this.carouselWrapper.nativeElement.firstChild
    );

    this.carouselWrapper.nativeElement.appendChild(firstSlideClone);

    this.slideCount.update((count) => count + 2);
    this.goToSlide(1, false);
  }

  private proceedSlide() {
    this.slideWidth = this.carouselWrapper.nativeElement.offsetWidth;
    this.slides.forEach((slide: ElementRef) => {
      slide.nativeElement.style.width = `${this.slideWidth}px`;
    });
    this.proceedSlideTransition(false);
  }

  private startAutoScroll() {
    if (this.autoScroll() === null) return;

    this.ngZone.runOutsideAngular(() => {
      this.autoScrollInterval = setInterval(() => {
        this.ngZone.run(() => {
          this.nextSlide();
        });
      }, this.autoScroll()!);
    });
  }

  private stopAutoScroll() {
    clearInterval(this.autoScrollInterval);
  }

  private nextSlide() {
    const newIndex = this.currentIndex + 1;
    this.goToSlide(newIndex);
  }

  private previousSlide() {
    const newIndex =
      (this.currentIndex - 1 + this.slideCount()) % this.slideCount();
    this.goToSlide(newIndex);
  }

  private goToSlide(index: number, animate: boolean = true) {
    this.currentIndex = index;

    if (this.currentIndex === 0) {
      this.proceedSlideTransition(animate, () =>
        this.goToSlide(this.slideCount() - 2, false)
      );
    } else if (this.currentIndex === this.slideCount() - 1) {
      this.proceedSlideTransition(animate, () => this.goToSlide(1, false));
    } else {
      this.proceedSlideTransition(animate);
    }
  }

  private proceedSlideTransition(
    animate: boolean = true,
    callback?: () => void
  ) {
    const offset = -this.currentIndex * this.slideWidth;
    const element = this.carouselWrapper.nativeElement;

    element.style.transition = animate ? 'transform 0.3s ease-out' : 'none';

    const transitionEndHandler = (event: TransitionEvent) => {
      if (event.propertyName === 'transform') {
        element.removeEventListener('transitionend', transitionEndHandler);
        if (callback) {
          callback();
        }
      }
    };

    if (animate) {
      element.addEventListener('transitionend', transitionEndHandler);
    } else if (callback) {
      callback();
    }

    element.style.transform = `translateX(${offset}px)`;
  }

  onTouchStart(event: TouchEvent) {
    this.stopAutoScroll();
    this.startX = event.touches[0]?.clientX;
    this.startY = event.touches[0]?.clientY;
    this.currentX = this.startX;
    this.currentY = this.startY;
    this.carouselWrapper.nativeElement.style.transition = 'none';
  }

  onTouchMove(event: TouchEvent) {
    this.currentX = event.touches[0]?.clientX;
    this.currentY = event.touches[0]?.clientY;
    const diffX = this.startX - this.currentX;
    const diffY = this.startY - this.currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      event.preventDefault();
      const offset = -this.currentIndex * this.slideWidth - diffX;
      this.carouselWrapper.nativeElement.style.transform = `translateX(${offset}px)`;
    }
  }

  onTouchEnd(event: TouchEvent) {
    const diffX = this.startX - this.currentX;
    const diffY = this.startY - this.currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      const threshold = 50;
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      } else {
        this.proceedSlideTransition();
      }
    }

    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  @HostListener('window:resize')
  onResize() {
    this.proceedSlideTransition();
  }
}
