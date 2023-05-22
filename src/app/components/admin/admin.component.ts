import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user-music';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  data1: Array<User> = new Array<User>();
  public resetForm() {
    this.selectedUser = {
      firstName: '',
      lastName: '',
      id: '',
      email: '',
      username: '',
      password: '',
      face: '',
      git: '',
      twitter: '',
      youtube: '',
      insta: '',
    };
  }

  @ViewChild('toggleElement') toggleElement!: ElementRef;
  isUserLoggedIn = true;
  selectedUser = new User();
  constructor(
    private service: ListMucsicService,
    private renderer: Renderer2,
    private toast: ToastrService
  ) {}
  
  check1 = true;

  ngOnInit(): void {
    this.service.getData().subscribe((data) => {
      this.data1 = data;
    });
  }
  delete(data: string) {
    this.service.deleteuser(data).subscribe((data) => {
      this.service.getData().subscribe((data) => {
        this.data1 = data;
      });
      this.toast.success('Data deleted successfully', 'Success', {
        toastClass: 'toast-custom',
      });
    });
  }

  add() {
    this.isUserLoggedIn = false;
    this.check1 = true;
  }
  cancel() {
    this.isUserLoggedIn = true;
  }
  newuser(registerForm: NgForm) {
    this.service.pushData(registerForm.value).subscribe((res) => {console.log(res)});
    this.service.getData().subscribe((data) => {
      this.data1 = data;
    });
    this.toast.success('Add New User successfully', 'Success', {
      toastClass: 'toast-custom',
    });
    this.isUserLoggedIn = true;
    this.resetForm();
  }
  edituser(id: string) {
    this.check1 = false;
    this.service.getData1(id).subscribe((data) => {
      this.selectedUser = data;
    });
    this.isUserLoggedIn = false;
  }

  // edituser(id: string){
  //   this.check1 = false;
  //   this.service.getData1(id).subscribe(data => {
  //     this.userupdate = data;
  //     console.log(this.userupdate);
  //     this.registerForm.patchValue(data);
  //   });
  //   this.isUserLoggedIn = false
  // }

  update1(registerForm: NgForm) {
    this.service
      .update(registerForm.value.id, registerForm.value)
      .subscribe((data) => {});
    this.toast.success('Update User successfully', 'Success', {
      toastClass: 'toast-custom',
    });
  }
}
