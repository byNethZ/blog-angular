import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {

  public page_title: string;
  public url;
  public posts: Array<Post>;
  public identity;
  public token;
  public userId;
  public user: User;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.page_title = 'Perfil';
    this.url = global.url;
    this.posts = [];
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.userId = '';
    this.user = new User(1,'','','','','','','')
  }

  ngOnInit(): void {
    this.getProfile();
  }
  
  getProfile(){
    //get id post from url
    this._route.params.subscribe(params => {
      let userId = params['id'];
      this.getUser(userId);
      this.getPosts(userId);
    });
  }

  getUser(userId:any){
    this._userService.getUser(userId).subscribe(
      response =>{
        this.user = response.user;
        console.log(response);
      },
      error =>{
        console.log(error);
      }
    )
  }

  getPosts(userId: any) {
    this._userService.getPosts(userId).subscribe(
      response => {
        if (response.status == 'succes') {
          this.posts = response.posts;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  deletePost(id: any) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(error);
      }
    )
  }

}
