import { Component, input, output } from '@angular/core';
import { BannerCard } from '@shared/types/banner-card.type';

@Component({
  selector: 'app-banner-card',
  standalone: true,
  imports: [],
  templateUrl: './banner-card.component.html',
  styleUrl: './banner-card.component.scss',
})
export class BannerCardComponent {
  public callbackFn = output<string>();
  public card = input<BannerCard>();

  public onButtonClick(): void {
    this.callbackFn.emit(this.card()?.title!);
  }
}
