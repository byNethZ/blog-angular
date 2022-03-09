import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token: string;
  public identity:any;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Identifícate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '','', '');
    this.status = '';
    this.token = '';
   }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.signup(this.user).subscribe(
      response =>{
        //token
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          //usuario identificado
          

        }else{
          this.status = 'error';
        }
        console.log(response);
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
