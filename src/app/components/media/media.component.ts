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
    const img = sessionStorage.getItem('img');
    console.log(img);
    
      this.service.update(idd, addlinkuser.value).subscribe((data) => {});
      this.toastr.success('Update User successfully', 'Success', {
        toastClass: 'toast-custom',
      });
      this.service.update(idd, {img : img}).subscribe((data) => {
        console.log(data);
      });
    // window.location.href = '';
    
  }

  clickimg(img1: string) {
    const img = img1
    sessionStorage.setItem('img',img)
  }
}
