import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BannerServiceService {
  private httpClient: HttpClient = inject(HttpClient);
}
