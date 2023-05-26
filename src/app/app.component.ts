import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListMucsicService } from './services/list-mucsic.service';

export interface Message {
  type: string;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  img: string = '';
  isUserLoggedIn = false;
  message: Message[] = [];
  chatform: any;
  user: any;
  checkopen = false;
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private renderer: Renderer2,
    private service: ListMucsicService
  ) {
    if (localStorage.getItem('username')) {
      this.isUserLoggedIn = true;
    }
    // this.sendmessage("tôi muốn tìm những bài hat hay nhất việt nam?")
  }

  @ViewChild('block', { static: true }) block!: ElementRef;
  @ViewChild('check', { static: true }) check!: ElementRef;
  @ViewChild('check1', { static: true }) check1!: ElementRef;
  @ViewChild('open', { static: true }) open!: ElementRef;

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      this.addStyles();
    }
    if (localStorage.getItem('idUser')) {
      const img = localStorage.getItem('idUser');
      this.service.getData1(img).subscribe((data) => {
        this.user = data;
        this.img = this.user.img;
        console.log(this.img);
      });
    }
    if(localStorage.getItem('idUser') == 'admin'){
    this.renderer.setStyle(this.check1.nativeElement, 'display', 'block');

    }
  }

  addStyles() {
    this.renderer.setStyle(this.check.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.block.nativeElement, 'display', 'none');
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('idUser');
    sessionStorage.removeItem('listmedia');
    sessionStorage.removeItem('img');
    sessionStorage.removeItem('musicplay');
    this.isUserLoggedIn = false;
    this.renderer.setStyle(this.check.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.block.nativeElement, 'display', 'block');
  }

  sendmessage(sendform: Message) {
    this.message.push({
      type: 'user',
      message: sendform.message,
    });

    this.service.sendmessage(sendform.message).subscribe((res) => {
      console.log(res);
      this.message.push({
        type: 'client',
        message: (res as any).message,
      });
    });
  }
  openchat() {
    this.renderer.setStyle(this.open.nativeElement, 'display', 'block');
    this.checkopen = true;
  }
  closechat() {
    this.renderer.setStyle(this.open.nativeElement, 'display', 'none');
  }
  admin(){
    this.router.navigate(['admin']);
  }

  
}
