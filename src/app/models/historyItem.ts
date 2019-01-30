import { searchResult } from './searchResult';

export class historyItem{
    text: string;
    requested: number;
    result: searchResult;
    isRandomSearch: boolean
}