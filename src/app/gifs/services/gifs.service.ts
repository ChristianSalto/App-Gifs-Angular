import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private api_key: string = '5NgYu8b9Nrkx7qEGSMSmpGdW5DALD0Pa';
  private url_service: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  get history() {
    return [...this._history];
  }

  public result: Gif[] = [];

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('historial')!) || [];
    this.result = JSON.parse(localStorage.getItem('resultados')!) || [];

    // this.searchGifs(this._history[0]);
  }

  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.url_service}/search`, { params })
      .subscribe((res) => {
        console.log(res.data);
        this.result = res.data;
        localStorage.setItem('resultados', JSON.stringify(this.result));
      });
  }
}
