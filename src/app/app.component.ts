import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isUserLoggedIn = false;

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private renderer: Renderer2
  ) {
    if (localStorage.getItem('username')) {
      this.isUserLoggedIn = true;
    }
  }

  @ViewChild('block', { static: true }) block!: ElementRef;
  @ViewChild('check', { static: true }) check!: ElementRef;

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      this.addStyles();

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
 
}
