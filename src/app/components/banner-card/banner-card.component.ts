import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-banner-card',
  standalone: true,
  imports: [],
  templateUrl: './banner-card.component.html',
  styleUrl: './banner-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerCardComponent {}
