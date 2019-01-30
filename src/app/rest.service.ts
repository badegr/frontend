import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { loginData } from './models/loginData';
import { searchResult } from './models/searchResult';
import { historyItem } from './models/historyItem';
import { history } from './models/history';

@Injectable()
export class RestService {
  private _baseUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) {    

  }

  getGif(searchName: string){
    return this.http.post<searchResult>(this._baseUrl + '/search?text='+searchName+'&token='+localStorage.getItem('token'),{});
  }

  getGifRandom(){
    return this.http.post<searchResult>(this._baseUrl + '/searchRandom?token='+localStorage.getItem('token'),{});
  }

  authUser(login: loginData){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(this._baseUrl + '/login?email='+login.email,{},{headers, responseType: 'text'});
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
  }
  getHistory(){
    return this.http.get<history>(this._baseUrl + '/history?token='+localStorage.getItem('token'));
  }

}
