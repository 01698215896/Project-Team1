import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  activeTab = 0;
  testuers: any;
  formlogin!: FormGroup;
  formres!: FormGroup;

  constructor(
    private service: ListMucsicService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formlogin = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.formres = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }


  register(registerForm: FormGroup) {
    if (registerForm.valid) {
      if( registerForm.value.password !== registerForm.value.confirmpassword){
        this.toastr.error('Confirmpassword không đúng', 'Error', {
          toastClass: 'toast-custom',
        });
        return;
      }
      this.service.getData().subscribe(data => {
        if(registerForm.value.id !== data.id) {
          this.service
            .pushData(registerForm.value)
            .subscribe((data) => console.log(data));
          registerForm.reset();
          this.toastr.success('Registered successfully', 'Success', {
            toastClass: 'toast-custom',
          });
        }else{
          this.toastr.error('Username đã tồn tại', 'Error', {
            toastClass: 'toast-custom',
          });
        }

      })
    } else {
      this.validateAll(registerForm);
    
    }
  }

  login(loginf: FormGroup) {

    if(loginf.valid){
      console.log(loginf.value);
      this.service.getUser(loginf.value.id).subscribe((data) => {
        this.testuers = data;
        if (this.testuers.password == loginf.value.password) {
          this.toastr.success('Login Success', 'Success', {
            toastClass: 'toast-custom',
          });
          localStorage.setItem('username', 'true');
          localStorage.setItem('idUser', this.testuers.id);
        }
        if (!this.testuers.img) {
          this.router.navigate(['media']);
        } else {
          window.location.href = '';
        }
      });
  
    }else{
      this.validateAll(loginf);
    }

  }

  private validateAll(form: FormGroup) {
    Object.keys(form.controls).forEach((item) => {
      const control = form.get(item);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAll(control);
      }
    });
  }
}
