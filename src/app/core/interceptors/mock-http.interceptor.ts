import { HttpInterceptorFn } from '@angular/common/http';

export const mockHttpInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
