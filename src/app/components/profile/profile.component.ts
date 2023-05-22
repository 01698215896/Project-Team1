import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';
import { NgForm } from '@angular/forms';

import { User } from '../../models/user-music';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  data1: Array<User> = new Array<User>();

  check1 = true;
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
  constructor(private service: ListMucsicService, private toastr: ToastrService) {}
  username: string = '';
  password: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  id: string = '';
  face: string = '';
  git: string = '';
  twitter: string = '';
  youtube: string = '';
  insta: string = '';
  img: string = '';
  showDataUser: any;
  showDataMedia: any;
  showDataImg: any;

  ngOnInit(): void {
    const idUser = localStorage.getItem('idUser');
    this.service.getUser(idUser).subscribe((res) => {
      this.showDataUser = res;
      this.firstName = this.showDataUser.firstName;
      this.lastName = this.showDataUser.lastName;
      this.email = this.showDataUser.email;
      this.password = this.showDataUser.password;
      this.id = this.showDataUser.id;
    });
    const listmedia = sessionStorage.getItem('listmedia');
    if (listmedia) {
      const list = JSON.parse(listmedia);
      this.face = list.face;
      this.git = list.git;
      this.twitter = list.twitter;
      this.insta = list.insta;
      this.youtube = list.youtube;
    }
    const img = sessionStorage.getItem('img');
    if (img) {
      this.img = img;
    }
  }
  add(id: string) {
    this.check1 = false;
    this.service.getData1(id).subscribe((data) => {
      this.selectedUser = data;
      console.log(this.selectedUser)
    });
    this.isUserLoggedIn = false;
  }
 
  update1(registerForm: NgForm) {
    this.service
      .update(registerForm.value.id, registerForm.value)
      .subscribe((data) => {});
    this.toastr.success('Update User successfully', 'Success', {
      toastClass: 'toast-custom',
    });
    this.isUserLoggedIn = true;


  } 
  cancel() {
    this.isUserLoggedIn = true;
  }
}
