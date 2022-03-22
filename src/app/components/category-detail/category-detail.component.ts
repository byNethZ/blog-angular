import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  providers: [ CategoryService, UserService, PostService ]
})
export class CategoryDetailComponent implements OnInit {
  public page_title: string;
  public category: Category;
  public posts: any;
  public url: string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService
  ) { 
    this.page_title = 'Category';
    this.category = new Category (1, '');
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

  getPostsByCategory(){
    this._route.params.subscribe(
      params => {
        let id = +params['id'];

        this._categoryService.getCategory(id).subscribe(
          response => {
            if(response.code == 200){
              this.category = response.categories;
              
              this._categoryService.getPosts(id).subscribe(
                response => {
                  if(response.status == 'succes'){
                    this.posts = response.posts
                  } else{
                    console.log(response);
                  }
                },
                error => {
                  console.log(error);
                }
              )
            }else{
              this._router.navigate(['/inicio']);
            }
          },
          error => {
            console.log(error);
          }
        )
      }
    )
  }


  deletePost(id:any){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPostsByCategory();
      },
      error => {
        console.log(error);
      }
    )
  }

}
