import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss'],
  providers: [ UserService, CategoryService, PostService ]
})
export class PostNewComponent implements OnInit {

  public page_title : string;
  public identity;
  public token;
  public post: Post;
  public categories: any;
  public status: string;
  public isEdit: boolean;
  public url;
/* 
  public froala_options : Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  }; */

  public froala_options : Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: 50,
    uploadAPI:  {
      url: global.url + "post/upload",
      headers: {
     "Authorization" : this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts:{
      attachPinBtn: 'Sube la imagen del post'
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.url = global.url;
    this.page_title = 'Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.post = new Post(1, 1, 1 , '','', '', null, null, null);
    this.status = '';
    this.isEdit = false;
  }
  
  ngOnInit(): void {
    this.getCategories();
    this.post.user_id = this.identity.sub;
    //console.log(this.categories);
  }

  onSubmit(form:any){
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if(response.code == 200){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    )
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.code == 200){
          this.categories = response.categories;
          //console.log(this.categories);
        } else{
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error'
      }
    );
  }

  imageUpload(data:any){
    let imageData = data.body;

    this.post.image = imageData.image;
  }

}
