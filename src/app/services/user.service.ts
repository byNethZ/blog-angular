import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable()
export class UserService {
    public url: string;
    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){
        return 'Hola Mundo desde servicio';
    }

    register(user:any) : Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url+'register', params, {headers: headers});
    }
    
    signup(user:any, getToken = null) : Observable<any>{
        if(getToken != null){
            user.getToken = true;
        }
        
        let json = JSON.stringify(user);
        let params = 'json='+json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'login', params, {headers: headers});

    }
}