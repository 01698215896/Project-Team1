import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isUserLoggedIn = false;

  constructor(private toastrService: ToastrService){
    if (sessionStorage.getItem('username')) {
      this.isUserLoggedIn = true;
    }
  }

  logout() {
    sessionStorage.removeItem('username');
    this.isUserLoggedIn = false;
  }
}
