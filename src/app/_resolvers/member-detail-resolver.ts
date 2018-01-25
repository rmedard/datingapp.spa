import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../_models/user';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {
  }

  /**
   *
   * @param {ActivatedRouteSnapshot} route : Helps get parameters from url
   * @param {RouterStateSnapshot} state
   * @returns {Observable<User> | Promise<User> | User}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    // We don't map because the router does it beneath
    return this.userService.getUser(route.params['id']).catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/members']);
      return Observable.of(null);
    });
  }
}
