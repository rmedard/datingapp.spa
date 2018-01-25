import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../_models/user';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AlertifyService} from '../_services/alertify.service';
import {UserService} from '../_services/user.service';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

  /**
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<User[]> | Promise<User[]> | User[]}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | User[] {
    // We don't map because the router does it beneath
    return this.userService.getUsers().catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/members']);
      return Observable.of(null);
    });
  }
}
