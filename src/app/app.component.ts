import {Component, OnInit} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {JwtHelper} from 'angular2-jwt';
import {User} from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dating app';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

    /**
     * We do this here because this is the highest component of all.
     * The decodedToken will be available on any page
     */
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
