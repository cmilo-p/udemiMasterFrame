import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/Article';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public url: string;

  constructor(
    private _articleServices: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
    this.article = new Article('0', '', '', '', '',);
  }

  ngOnInit(): void {

    this._route.params.subscribe(params => {

      let id = params['id'];

      this._articleServices.getArticle(id).subscribe(
        {
          next: (response) => {
            if (response.article) {
              this.article = response.article;
            } else {
              this._router.navigate(['/home']);
            }
          },
          error: (error) => {
            console.log(error);
            this._router.navigate(['/home']);
          }
        }
      );

    });

  }

  delete(id: any) {
    this._articleServices.delete(id).subscribe(
      {
        next: (response) => { 
          this._router.navigate(['/blog']);
        },
        error: (error) => {
          console.log(error);
          this._router.navigate(['/blog']);
        }
      }
    );
  }

}
