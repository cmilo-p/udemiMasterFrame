import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {

  public title: string;
  public articles!: Article[];

  constructor(
    private _articleService: ArticleService
  ) {
    this.title = "Últimos articulos";
  }

  ngOnInit(): void {
    this._articleService.getArticles(true).subscribe(
      {
        next: (response) => {
          if (response) {
            this.articles = response.articles;
            console.log(this.articles);
          } else {

          }
        },
        error: (error) => {
          console.log(error)
        }
      }
    );
  }

}
