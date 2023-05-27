import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';
import { NgForm } from '@angular/forms';

import { User } from '../../models/user-music';
import { ToastrService } from 'ngx-toastr';
import { ListMucsic } from 'src/app/models/list-mucsic';

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
      _id: '',
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
  idd: string = '';
  twitter: string = '';
  youtube: string = '';
  insta: string = '';
  img: string = '';
  showDataUser: any;
  showDataMedia: any;
  showDataImg: any;
  listMucsic: Array<ListMucsic> = new Array<ListMucsic>();


  ngOnInit(): void {
    
    const idUser = localStorage.getItem('idUser');
    console.log(idUser);
    this.service.getUser(idUser).subscribe((res) => {
      this.showDataUser = res;
      console.log(this.showDataUser);
      this.firstName = this.showDataUser.firstName;
      this.lastName = this.showDataUser.lastName;
      this.email = this.showDataUser.email;
      this.password = this.showDataUser.password;
      this.id = this.showDataUser.id;
      this.face = this.showDataUser.face;
      this.git = this.showDataUser.git;
      this.twitter = this.showDataUser.twitter;
      this.youtube = this.showDataUser.youtube;
      this.insta = this.showDataUser.insta;
      this.img = this.showDataUser.img;
    });
    const id = localStorage.getItem('idUser');
    this.service.getData1(id).subscribe((data) => {
      this.listMucsic = data.listmusic;
    });
    
  
  }
  add() {
 
    const idd = localStorage.getItem('idUser');
     
    this.check1 = false;
    this.service.getData1(idd).subscribe((data) => {
      this.selectedUser = data;
      console.log(this.selectedUser)
    });
    this.isUserLoggedIn = false;
  }
 
  update1(registerForm: NgForm) {
    const idd = localStorage.getItem('idUser');

    this.service
      .update(idd, registerForm.value)
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
