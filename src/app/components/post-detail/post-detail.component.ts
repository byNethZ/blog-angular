import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [ PostService, UserService ]
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  public url;
  public identity;

  constructor(
    private _postService : PostService,
    private _route: ActivatedRoute,
    private _router : Router,
    private _userService: UserService
  ) { 
    this.post = new Post(1, 1, 1, '', '', '', null, null, null);
    //this.post = new Post(1, 1, 1, '', '', '', null, {'', 1, '', ''});
    this.url = global.url;
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    //get id post from url
    this._route.params.subscribe(params => {
      let id = params['id'];
      
      //ajax for data
      this._postService.getPost(id).subscribe(
        response => {
          if(response.code == 200){
            this.post = response.post;
            console.log(this.post);

          }else {
            this._router.navigate(['/inicio']);
          }
        },
        error =>{
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );

    })

  }

}
