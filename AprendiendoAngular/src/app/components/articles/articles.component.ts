import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input() articles!: Article[];

  public url:string;

  constructor() {
    this.url = Global.url;
   }

  ngOnInit(): void {
    console.log(this.articles);
  }

}
