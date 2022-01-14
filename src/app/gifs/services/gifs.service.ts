import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiBusqueda = '/search';
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
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params: HttpParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '15')
      .set('q', query);

    this.http.get<SearchGifsResponse>(this.apiUrl + this.apiBusqueda, { params })
      .subscribe((res: any) => {
        console.log('res', res);
        this.resultados = res.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

    console.log(this._historial);
  }
}
