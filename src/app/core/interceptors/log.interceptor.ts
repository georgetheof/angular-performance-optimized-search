import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const started = Date.now();
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        const elapsed = Date.now() - started;
        console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        console.log(req.url, 'returned a response with status', event.status);
      }
    })
  );
}
