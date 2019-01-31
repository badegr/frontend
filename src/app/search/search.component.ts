import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { SearchResult } from '../models/searchResult';
import { HistoryItem } from '../models/historyItem';
import { History } from '../models/history';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchValue = '';
  gif = '';

  history: HistoryItem[];

  constructor(private restService: RestService, private router: Router) {}

  onEnter(value: string) {
    this.searchValue = value;
    this.restService.getGif(value).subscribe(v => this.success(v, false));
  }

  success(result: SearchResult, isRandom: boolean) {
    if (result != null) {
      this.gif = result.url;
      const item = new HistoryItem();
      item.result = result;
      item.isRandomSearch = isRandom;
      item.requested = this.history.length + 1;
      if (!isRandom) {
        item.text = this.searchValue;
      }
      this.history.push(item);
    } else {
      this.restService
        .getGif(this.searchValue)
        .subscribe(value => this.success(value, isRandom));
    }
  }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.restService
      .getHistory()
      .subscribe(reuslt => this.historyResult(reuslt));
  }

  randomSearch() {
    this.restService
      .getGifRandom()
      .subscribe(value => this.success(value, true));
  }

  historyResult(history: History) {
    if (history != null) {
      this.history = history.items;
    } else {
      this.history = [];
    }
  }

  logout() {
    this.restService.logout();
    this.router.navigateByUrl('');
  }
}
