import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiUrl: string = 'https://api.giphy.com/v1/gifs/search';
  private apiKey: string = 'cijbfEcv2oZa6GLWYhadfi3xLJCrDk5m';
  private _historial: string[] = [];
  resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    let url = this.apiUrl + '?api_key=' + this.apiKey + '&limit=50&q=' + query;
    console.log(url);

    this.http.get<SearchGifsResponse>(url)
      .subscribe((res: any) => {
        console.log('res', res);
        this.resultados = res.data;
      });

    console.log(this._historial);
  }
}
