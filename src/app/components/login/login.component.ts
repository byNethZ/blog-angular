import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token: any;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = '';
    this.token = '';
  }

  ngOnInit(): void {
    //keeping executing but only works with url params 'sure'
    this.logout();
  }

  onSubmit(form: any) {
    this._userService.signup(this.user).subscribe(
      response => {
        //token
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          //usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
              //token
              this.identity = response;

              console.log(this.token);
              console.log(this.identity);

              //persistir datos en localstorage
              localStorage.setItem('token', JSON.stringify(this.token));
              localStorage.setItem('identity', JSON.stringify(this.identity));

              //redirect
              this._router.navigate(['inicio']);

            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //redirect
        this._router.navigate(['login']);
      }
    });
  }

}
