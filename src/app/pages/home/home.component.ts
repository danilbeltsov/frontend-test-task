import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CarouselComponent } from '@components/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { BannerService } from '@shared/services/banner.service';
import { BannerCard } from '@shared/types/banner-card.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BannerCardComponent } from '@components/banner-card/banner-card.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, CommonModule, BannerCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);
  private bannerService: BannerService = inject(BannerService);

  public bannerCards: WritableSignal<BannerCard[]> = signal<BannerCard[]>([]);
  public loading: WritableSignal<boolean> = signal<boolean>(false);

  public ngOnInit(): void {
    this.getBannerImages();
  }

  public getBannerImages(): void {
    this.loading.set(true);

    this.bannerService
      .getBannerImages()
      .pipe(delay(1000), takeUntilDestroyed(this.destroyRef))
      .subscribe((cards) => {
        this.bannerCards.set(cards);
        this.loading.set(false);
      });
  }

  public onCallbackFn(data: any): void {
    console.log(`${data} banner button clicked`);
  }
}
