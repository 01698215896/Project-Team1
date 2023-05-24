import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-banphathanh',
  templateUrl: './banphathanh.component.html',
  styleUrls: ['./banphathanh.component.css'],
})
export class BanphathanhComponent implements OnInit {
  datas: Array<ListMucsic> = [];
  datasvn: Array<ListMucsic> = [];
  datasqt: Array<ListMucsic> = [];
  currentSong: string = '';
  casy: string = '';
  url: string = '';
  id: number = 0;

  currentSongimg: string = '';

  @ViewChild('css', { static: true }) css!: ElementRef;
  constructor(
    private service: ListMucsicService,
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.getApi().subscribe((res) => {
      this.datas = res;
    });
    this.service.fetchapi('vietnam').subscribe((res) => {
      this.datasvn = res;
      console.log(this.datasvn);
    });
    this.service.fetchapi('quocte').subscribe((res) => {
      this.datasqt = res;
    });
  }

  play(linkApi: string, id: number) {
    console.log(id);
    this.service.fetchapiMS(linkApi, id).subscribe((res) => {
      console.log(res);
      const song = res;
      this.currentSong = song.name;
      this.url = song.url;
      this.id = song.id;

      this.casy = song.casy;
      this.currentSongimg = song.img;
    });
    this.renderer.setStyle(
      this.css.nativeElement,
      'transform',
      'translateX(0)'
    );
    this.service.playmusic1(linkApi,id).subscribe((data) => {
      console.log(data);
      sessionStorage.setItem('musicplay', JSON.stringify(data));
    });
    
  }

  check() {
    if (sessionStorage.getItem('username')) {
      this.toastr.success('Download Successfully', 'Success', {
        toastClass: 'toast-custom',
      });
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  product(id: number) {
    this.router.navigate(['musicplay']);
  }
}
