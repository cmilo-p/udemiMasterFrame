import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {

  public articles!: Article[];
  public search: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleServices: ArticleService
  ) { 
    this.search = '';
  }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
      var search = params['search'];
      this.search = search;

      this._articleServices.search(search).subscribe(
        {
          next: (response) => {
            if (response.articles) {
              this.articles = response.articles;
              console.log(this.articles);
            } else {
              this.articles = [];
            }
          },
          error: (error) => {
            console.log(error);
            this.articles = [];
          }
        }
      );
    });

  }

}
