import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DataService {
  protected url: string;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
            .pipe(
              catchError(this.handleError)
            );
  }

  create(resource: { title: string; }) {
    return this.http.post(this.url, JSON.stringify(resource))
            .pipe(
              catchError(this.handleError)
            );
  }

  update(resource: { id: string; }) {
    return this.http.patch(this.url + '/' + resource.id, {isRead: true})
            .pipe(
              catchError(this.handleError)
            );
  }

  delete(id: string) {
    return this.http.delete(this.url + '/' + id)
            .pipe(
              catchError(this.handleError)
            );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    } else {
      return Observable.throw(new AppError(error));
    }
  }
}
