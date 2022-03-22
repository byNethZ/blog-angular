import { Component, OnInit, DoCheck } from '@angular/core';
import { global } from './services/global';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ UserService, CategoryService ]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'blog-angular';
  public identity;
  public token;
  public url;
  public categories : Array<any>;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    this.categories = [];
  }

  ngOnInit(): void {
    console.log('WebApp cargada correctamente');
    this.getCategories();
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
          //console.log(this.categories);
        }else{
          console.log(response)
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
