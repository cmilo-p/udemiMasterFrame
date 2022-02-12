import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  pruebas() {
    return "Servicio de articulos!!!!!";
  }

  getArticles(last: any = null): Observable<any> {

    var articles = 'articles'

    if (last != null) {
      var articles = 'articles/true'
    }

    return this._http.get(this.url + articles);
  }

  getArticle(articleId: any): Observable<any> {
    return this._http.get(this.url + 'article/' + articleId);
  }


} 