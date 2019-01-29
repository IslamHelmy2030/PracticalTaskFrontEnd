import { Injectable } from "@angular/core";
import { tap, map, catchError } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  AUTH_HEADER_KEY = "Authorization";
  AUTH_PREFIX = "Bearer ";
  CONTENT_TYPE = "Content-Type";
  CONTENT_TYPE_VALUE = "application/json";
  constructor() {}
  // function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // how to update the request Parameters
    // tslint:disable-next-line:max-line-length

    const updatedRequest = request.clone({
      headers: request.headers
        .set(this.AUTH_HEADER_KEY, this.AUTH_PREFIX + "")
        .append(this.CONTENT_TYPE, this.CONTENT_TYPE_VALUE)
    });
    // // console.log(updatedRequest);
    return next.handle(updatedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),

      catchError(error => {
        return throwError(error);
      })
    );
  }
}
