import { Component } from '@angular/core';
import { PartyService } from '../service/PartyService';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any;
  password: any;
  response: any;
  token:any
  constructor(private svc: PartyService, private router: Router,private http: HttpClient) { }
  onsubmit() { }

  Login() {
      this.svc.login(this.username, this.password).subscribe(response => {
        console.log(response);
        this.router.navigate(['party']);
      });
    }
}





