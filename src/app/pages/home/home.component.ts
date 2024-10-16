import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent } from '@components/carousel/carousel.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
