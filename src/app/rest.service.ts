import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RestService {
  private _baseUrl = 'http://localhost:5000/api/carsetup';
  constructor(private http: HttpClient) {

  }

  getGif(searchName: string){
    return this.http.get<string>(this._baseUrl + '?search='+searchName);
  }
}
