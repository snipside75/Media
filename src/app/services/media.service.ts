import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

@Injectable()
export class MediaService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  // private user: any =  JSON.parse(localStorage.getItem("user"));
  private token: string = '';
  private limit: number = 10;


  constructor(private http: Http, private loginService: LoginService, private router: Router) {  }

  getMedia = () => {
    return this.http.get(this.url + '/media')
      .map(
      res =>
        res.json()
      );
  };

  getMediaByID = (id: number) => {
    return this.http.get(this.url + '/media/' + id)
      .map(
      res =>
        res.json()
      );
  };

  getUserByID = (id: number) => {
    this.token = this.loginService.getUser().token;
    return this.http.get(this.url + '/users/' + id + '?token=' + this.token)
      .map(
      res =>
        res.json()
      );
  };

  getNew = () => {
    return this.http.get(this.url + '/media?limit=' + this.limit)
      .map(
      res =>
        res.json()
      );
  };

  uploadMedia = (formContent: any) => {
    this.token = this.loginService.getUser().token;
    return this.http.post(this.url + '/media?token=' + this.token, formContent)
      .map(
      res => {
        res.json();
        this.router.navigate(['front']);
      });
  };

}
