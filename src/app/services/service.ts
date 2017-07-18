import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

declare var swal: any;

@Injectable()
  export class UserService{

  users:any;
  constructor(private http:Http, private navCtrl: NavController) {
  }

  ngOnInit(){
    this.getUsers()
      .subscribe(
        users=> this.users = users
      )
      console.log(this.users)
  }

  baseUrl = 'http://52.15.90.163:3002/'

  getUsers(): Observable<any>{
    return this.http
    .get(this.baseUrl + 'api/users')
    .map((response: Response)=> response.json());
  }

  postUser(data) {
    console.log(data)
    return this.http.post(this.baseUrl + 'api/users', data)
    .map(res => res.json())
  }

  loginUser(user){
    if (user.username === null || user.username === "") {
      swal(
        'Oops...',
        'Must enter username',
        'error'
      )
    }
    if (user.password === null || user.password === "") {
      swal(
        'Oops...',
        'Must enter password',
        'error'
      )
    }
    return this.http.post(this.baseUrl + 'api/users/login', user)
    .map((res) => res.json())
  }

  }