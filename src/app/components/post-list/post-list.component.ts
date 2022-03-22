import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: any;
  @Input() identity: any;
  @Input() url: any;

  constructor() { }

  ngOnInit(): void {
  }

  deletePost(id:any){
/*     this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.log(error);
      }
    ) */
  }

}
