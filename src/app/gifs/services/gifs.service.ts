import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private api_key: string = '5NgYu8b9Nrkx7qEGSMSmpGdW5DALD0Pa';
  private _history: string[] = [];

  get history() {
    return [...this._history];
  }

  //TODO: Cambiar any por su tipo
  public result:any[] = []

  constructor(private http: HttpClient) {}

  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
    }

    this.http
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=5NgYu8b9Nrkx7qEGSMSmpGdW5DALD0Pa&q=${query}&limit=10`
      )
      .subscribe((res: any) => {
        console.log(res.data);
        this.result = res.data;
      });
  }
}
