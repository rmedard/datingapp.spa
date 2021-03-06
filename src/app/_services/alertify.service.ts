import {Injectable} from '@angular/core';

/**
 * We want to use a library that doesn't have a typescript declaration file.
 */
declare let alertify: any;

@Injectable()
export class AlertifyService {

  constructor() {
  }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
