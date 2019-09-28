import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService extends DataService {
  protected url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(http: HttpClient) {
    super(http);
  }
}
