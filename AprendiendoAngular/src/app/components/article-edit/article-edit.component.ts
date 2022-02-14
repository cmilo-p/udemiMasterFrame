import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article: Article;
  public status: string;
  public url: string;
  public is_edit: boolean;
  public page_title: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: 50,
    uploadAPI: {
      url: Global.url + 'upload-image/',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen para el artculo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleServices: ArticleService
  ) {
    this.article = new Article('', '', '', '', null);
    this.status = '';
    this.url = Global.url;
    this.is_edit = true;
    this.page_title = 'Editar articulo  ';
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit() {
    this._articleServices.update(this.article._id, this.article).subscribe(
      {
        next: (response) => {
          if (response.status == 'success') {
            this.status = response.success;
            this.article = response.article;
            this._router.navigate(['/blog/articulo', this.article._id]);
          } else {
            this.status = response.error;
          }
        },
        error: (error) => {
          console.log(error);
          this.status = 'error';
        }
      }
    );
  }

  imageUpload(data: any) {
    let image_data = data.body.image;
    this.article.image = image_data;
  }

  getArticle() {
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

}
