import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [ UserService ]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity:any;
  public token:any;
  public status:any;
  public url;
  public froala_options : Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: 50,
    uploadAPI:  {
      url: global.url + "upload",
      headers: {
     "Authorization" : this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts:{
      attachPinBtn: 'Sube tu avatar de usuario'
    }
  };

  constructor(
    private _userService : UserService
  ) {
    this.page_title = 'Ajustes de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    //get data user
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      'ROLE_USER',
      this.identity.email, '',
      this.identity.description,
      this.identity.image
      );
      this.url = global.url;
   }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.update(this.token, this.user).subscribe(
      response => {

        if(response.code == 200){
          this.status = 'success';

          if(response.changed.name){
            this.user.name = response.changed.name;
          }
          if(response.changed.surname){
            this.user.surname = response.changed.surname;
          }
          if(response.changed.email){
            this.user.email = response.changed.email;
          }
          if(response.changed.description){
            this.user.description = response.changed.description;
          }
          if(response.changed.image){
            this.user.image = response.changed.image;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }else{

        };
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  avatarUpload(datos:any){
    let data = datos.body;

    this.user.image = data.image;
  }

}
