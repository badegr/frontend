import { SearchResult } from './searchResult';

export class HistoryItem {
  text: string;
  requested: number;
  result: SearchResult;
  isRandomSearch: boolean;
}
