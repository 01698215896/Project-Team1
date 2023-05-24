import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent implements OnInit {
  list = {
    face: '',
    git: '',
    twitter: '',
    youtube: '',
    insta: '',
  };
  face: string = '';
  git: string = '';
  twitter: string = '';
  youtube: string = '';
  insta: string = '';
  id: string = '';
  constructor(
    private service: ListMucsicService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  activeTab = 0;
  setActiveTab(index: number) {
    this.activeTab = index;
  }

  addlink(addlinkuser: NgForm) {
    const idd = localStorage.getItem('idUser');
    console.log(idd)
    console.log(addlinkuser.value);
      this.service.update(idd, addlinkuser.value).subscribe((data) => {console.log(data)});
      this.toastr.success('Update User successfully', 'Success', {
        toastClass: 'toast-custom',
      });

    window.location.href = 'profile';
    
  }

  clickimg(img: string) {
    this.face = img;
    console.log(this.face);
    sessionStorage.setItem('img', this.face);
  }
}
