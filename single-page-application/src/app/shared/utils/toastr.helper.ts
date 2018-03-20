import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastrHelper {

  constructor(private toastrService: ToastrService) {
  }

  error(message, title: string = 'Error') {
    if (!message || message === 'undefined' || message.includes('Server Internal Error')) {
      message = 'Connection problems, sorry. We can\'t access our api.';
    }
    this.toast(message, title, 'error');
  }

  success(message: string, title: string = 'Success') {
    this.toast(message, title, 'success');
  }

  private toast(message: string, title: string, type: 'success' | 'error') {
    if (!message) {
      return;
    }
    this.toastrService[type](message, title);
  }
}
