import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mockBannerImages } from '@shared/mocks/banner-images.mock';

export const mockHttpInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<unknown>> => {
  if (req.url.includes('/api/banner-images')) {
    const fakeResponse = new HttpResponse({
      status: 200,
      body: mockBannerImages,
    });

    return of(fakeResponse);
  }
  return next(req);
};
