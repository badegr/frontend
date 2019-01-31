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
    this.restService.getGif(value).subscribe(value => this.success(value,false));
  }

  success(result: searchResult, isRandom: boolean){
    if(result != null){
      this.gif = result.url;
      const item = new historyItem();
      item.result = result;
      item.isRandomSearch = isRandom;
      item.requested = history.length + 1;
      if(!isRandom){
        item.text = this.searchValue;
      }
      this.history.push(item);
    } else {
      this.restService.getGif(this.searchValue).subscribe(value => this.success(value,isRandom));
    }
  }

  ngOnInit() {
    this.getHistory();
  }

  getHistory(){
    this.restService.getHistory().subscribe(reuslt => this.historyResult(reuslt));
  }

  randomSearch(){
    this.restService.getGifRandom().subscribe(value => this.success(value,true));
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
