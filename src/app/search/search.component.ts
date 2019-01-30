import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router, ActivatedRoute, UrlSegment, NavigationEnd } from '@angular/router';
import { searchResult } from '../models/searchResult';
import { historyItem } from '../models/historyItem';
import { history } from '../models/history';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchValue = '';
  gif = '';

  history: historyItem[];

  constructor(private restService: RestService, private router: Router){
  
  }

  onEnter(value: string) {
    this.searchValue = value;
    this.restService.getGif(value).subscribe(value => this.success(value));
  }

  success(result: searchResult){
    if(result != null){
      this.gif = result.url;
      this.getHistory();
    } else {
      this.restService.getGif(this.searchValue).subscribe(value => this.success(value));
    }
  }

  ngOnInit() {
    this.getHistory();
  }

  getHistory(){
    this.restService.getHistory().subscribe(reuslt => this.historyResult(reuslt));
  }

  randomSearch(){
    this.restService.getGifRandom().subscribe(value => this.success(value));
  }

  historyResult(history: history){
    if(history != null){
      this.history = history.items;
    }
  }

  logout(){
    this.restService.logout();
    this.router.navigateByUrl('');
  }

}
