import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BannerCard } from '@shared/types/banner-card.type';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private httpClient = inject(HttpClient);

  public getBannerImages(): Observable<BannerCard[]> {
    return this.httpClient.get<BannerCard[]>('/api/banner-images');
  }
}
