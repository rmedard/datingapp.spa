import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../_models/user';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AlertifyService} from '../_services/alertify.service';
import {UserService} from '../_services/user.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {AuthService} from '../_services/auth.service';


@Injectable()
export class MemberEditResolver implements Resolve<User> {

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {
  }

  /**
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<User> | Promise<User> | User}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    return this.userService.getUser(this.authService.decodedToken.nameid).catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/members']);
      return Observable.of(null);
    });
  }
}
