import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiUrl: string = 'https://api.giphy.com/v1/gifs/search';
  private apiKey: string = 'cijbfEcv2oZa6GLWYhadfi3xLJCrDk5m';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ) { }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get(this.apiUrl + '?api_key=' + this.apiKey + '&limits=10&q=' + query)
      // this.http.get('https://api.giphy.com/v1/gifs/search?api_key=cijbfEcv2oZa6GLWYhadfi3xLJCrDk5m&q=dbz&limit=10')
      .subscribe(res => {
        //this.http.get(this.apiUrl + '?api_key=' + this.apiKey + '&limits=10&q=' + query).subscribe(res => {
        console.log('res', res);
      });

    console.log(this._historial);
  }
}
