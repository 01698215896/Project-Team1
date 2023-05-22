import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  activeTab = 0;
  testuers: any;

  constructor(
    private service: ListMucsicService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  setActiveTab(index: number) {
    this.activeTab = index;
  }
  register(registerForm: NgForm) {
    if(registerForm.valid){
    if(registerForm.value.password !== registerForm.value.confirmPassword){
      this.toastr.error('Password or ConfirmPassword no', 'Error', {
        toastClass: 'toast-custom',
      });
    }

      this.service
        .pushData(registerForm.value)
        .subscribe((data) => console.log(data));
      registerForm.reset();
      this.toastr.success('Registered successfully', 'Success', {
        toastClass: 'toast-custom',
      });
    } else{
      this.toastr.error('Username Or Password Invalid', 'Error', {
        toastClass: 'toast-custom',
      });
      return 
    }
    
  }

  login(loginf: NgForm) {
    this.service.getUser(loginf.value.id).subscribe((data) => {
      this.testuers = data;
      
      if (this.testuers.password == loginf.value.password) {
        this.toastr.success('Login Success', 'Success', {
          toastClass: 'toast-custom',
        });
        if(!loginf.valid){
          localStorage.setItem('username', 'true');
    localStorage.setItem('idUser', loginf.value.id);

        }

      } else {
        this.toastr.error('Username Or Password Invalid', 'Error', {
          toastClass: 'toast-custom',
        });
        return
      }
      if (!this.testuers.face) {
        this.router.navigate(['media']);
      } else {
        this.router.navigate(['']);
        window.location.href = '/';
      }
    });
  }
}
